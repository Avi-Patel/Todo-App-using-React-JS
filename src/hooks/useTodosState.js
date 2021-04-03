import { useCallback, useReducer, useContext, useRef, useEffect } from "react";

import { SnackbarContext } from "../components/SnackbarProvider";

import { mockServer } from "../mockServer";
import { ACTIONS } from "../constants";

const findIndexById = (todos, id) => todos.findIndex((todo) => todo.id === id);

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, todos: state.todos.concat(action.payload.newTodos) };

    case ACTIONS.UPDATE:
      const todos = [...state.todos];
      action.payload.updatedTodos.forEach((updatedTodo) => {
        const indexInTodos = findIndexById(todos, updatedTodo.id);
        todos[indexInTodos] = updatedTodo;
      });
      return { ...state, todos };

    case ACTIONS.DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => !action.payload.ids.includes(todo.id)),
      };

    case ACTIONS.TOGGLE_FROM_SELECTED:
      if (state.currentlySelectedIds.includes(action.payload.id)) {
        return {
          ...state,
          currentlySelectedIds: state.currentlySelectedIds.filter((id) => id !== action.payload.id),
        };
      } else {
        return {
          ...state,
          currentlySelectedIds: state.currentlySelectedIds.concat(action.payload.id),
        };
      }
    case ACTIONS.RESET_SELECTED_IDS:
      return { ...state, currentlySelectedIds: [] };

    default:
      return state;
  }
};

const INITIAL_TODOS_STATE = {
  todos: [],
  currentlySelectedIds: [],
};

export const useTodosState = () => {
  const [todosState, dispatch] = useReducer(reducer, INITIAL_TODOS_STATE);

  const showSnackbar = useContext(SnackbarContext);
  const showSnackbarRef = useRef();
  showSnackbarRef.current = showSnackbar;

  useEffect(
    () =>
      mockServer
        .getTodosFromDatabase()
        .then((todos) => {
          dispatch({ type: ACTIONS.ADD, payload: { newTodos: todos } });
        })
        .catch(showSnackbarRef.current),
    []
  );

  const onTodoAction = useCallback(
    ({ type, payload }) => {
      let updatedTodos;
      let ids;

      switch (type) {
        case ACTIONS.ADD:
          mockServer
            .createTodoInDatabase(payload.newTodos)
            .then(() => {
              dispatch({
                type: ACTIONS.ADD,
                payload: {
                  newTodos: Array.isArray(payload.newTodos) ? payload.newTodos : [payload.newTodos],
                },
              });
            })
            .catch(showSnackbarRef.current);
          break;

        case ACTIONS.UPDATE:
          updatedTodos = payload.updatedTodos;
          mockServer
            .updateTodoInDatabase(updatedTodos)
            .then(() => {
              dispatch({
                type: ACTIONS.UPDATE,
                payload: {
                  updatedTodos: Array.isArray(updatedTodos) ? updatedTodos : [updatedTodos],
                },
              });
              if (Array.isArray(updatedTodos)) {
                dispatch({ type: ACTIONS.RESET_SELECTED_IDS });
              }
            })
            .catch(showSnackbarRef.current);
          break;

        case ACTIONS.DELETE:
          ids = payload.ids;
          mockServer
            .deleteTodoFromDatabase(ids)
            .then(() => {
              dispatch({
                type: ACTIONS.DELETE,
                payload: { ids: Array.isArray(ids) ? ids : [ids] },
              });
              if (Array.isArray(payload.ids)) {
                dispatch({ type: ACTIONS.RESET_SELECTED_IDS });
              }
            })
            .catch(showSnackbarRef.current);
          break;

        case ACTIONS.TOGGLE_COMPLETION:
          ids = Array.isArray(payload.ids) ? payload.ids : [payload.ids];
          updatedTodos = ids.map((id) => {
            const index = findIndexById(todosState.todos, id);
            return { ...todosState.todos[index], completed: !todosState.todos[index].completed };
          });
          mockServer
            .updateTodoInDatabase(updatedTodos)
            .then(() => {
              dispatch({
                type: ACTIONS.UPDATE,
                payload: {
                  updatedTodos: updatedTodos,
                },
              });
              if (Array.isArray(payload.ids)) {
                dispatch({ type: ACTIONS.RESET_SELECTED_IDS });
              }
            })
            .catch(showSnackbarRef.current);
          break;

        case ACTIONS.TOGGLE_FROM_SELECTED:
          dispatch({ type, payload });
          break;
        case ACTIONS.RESET_SELECTED_IDS:
          dispatch({ type });
          break;
        default:
          break;
      }
    },
    [todosState]
  );

  return { todosState, onTodoAction };
};
