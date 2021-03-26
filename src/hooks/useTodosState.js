import { useCallback, useReducer, useContext, useRef, useEffect } from "react";

import { SnackbarContext } from "../components/SnackbarProvider";

import { mockServer } from "../mockServer";
import { ACTIONS } from "../constants";

const findIndexById = (todos, id) => todos.findIndex((todo) => todo.id === id);

const reducer = (state, action) => {
  let index;
  let todos;
  switch (action.type) {
    case ACTIONS.ADD:
      console.log(action.payload.newTodos);
      todos = [...state.todos].concat(action.payload.newTodos);
      return { ...state, todos };

    case ACTIONS.UPDATE:
      todos = [...state.todos];
      action.payload.updatedTodos.forEach((updatedTodo) => {
        index = findIndexById(todos, updatedTodo.id);
        todos = todos.slice(0, index).concat(updatedTodo, todos.slice(index + 1));
      });
      return { ...state, todos };

    case ACTIONS.DELETE:
      todos = [...state.todos];
      action.payload.ids.forEach((id) => {
        index = findIndexById(todos, id);
        todos = todos.slice(0, index).concat(todos.slice(index + 1));
      });
      return { ...state, todos };

    case ACTIONS.TOGGLE_FROM_SELECTED:
      index = state.currentlySelectedIds.indexOf(action.payload.id);
      if (index === -1) {
        return {
          ...state,
          currentlySelectedIds: state.currentlySelectedIds.concat(action.payload.id),
        };
      } else {
        return {
          ...state,
          currentlySelectedIds: state.currentlySelectedIds
            .slice(0, index)
            .concat(state.currentlySelectedIds.slice(index + 1)),
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
          console.log(payload.newTodos);
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
            .catch(showSnackbar);
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
            .catch(showSnackbar);
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
              if (Array.isArray(ids)) {
                dispatch({ type: ACTIONS.RESET_SELECTED_IDS });
              }
            })
            .catch(showSnackbar);
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
              dispatch({ type: ACTIONS.RESET_SELECTED_IDS });
            })
            .catch(showSnackbar);
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
    [showSnackbar, todosState]
  );

  return { todosState, onTodoAction };
};
