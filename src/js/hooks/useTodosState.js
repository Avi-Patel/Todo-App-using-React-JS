import { useCallback, useReducer, useContext } from "react";

import { SnackbarContext } from "../components/SnackbarProvider";

import { mockServer } from "../mockServer";
import { ACTIONS } from "../constants";

const findIndexById = (todos, id) => todos.findIndex((todo) => todo.id === id);
const findIndexToInsert = (todos, id) => {
  let index = todos.findIndex((todo, i) => todo.id > id && i > 0 && todos[i - 1].id < id);
  if (todos.length === 0 || id < todos[0].id) {
    index = 0;
  } else if (index === -1) {
    index = todos.length;
  }
  return index;
};

const reducer = (state, action) => {
  let index;
  let todos;
  switch (action.type) {
    case ACTIONS.ADD:
      todos = [...state.todos];
      action.payload.newTodos.forEach((newTodo) => {
        index = findIndexToInsert(todos, newTodo.id);
        todos = todos.slice(0, index).concat(newTodo, todos.slice(index + 1));
      });
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

  const initializeTodos = useCallback(
    () =>
      mockServer
        .getTodosFromDatabase()
        .then((todos) => {
          dispatch({ type: ACTIONS.ADD, payload: { newTodos: todos } });
        })
        .catch(showSnackbar),
    [showSnackbar]
  );

  const addTodo = useCallback(
    (newTodo) =>
      mockServer
        .createTodoInDatabase(newTodo)
        .then(() => {
          dispatch({
            type: ACTIONS.ADD,
            payload: { newTodos: Array.isArray(newTodo) ? newTodo : [newTodo] },
          });
        })
        .catch(showSnackbar),
    [showSnackbar]
  );

  const updateTodo = useCallback(
    (updatedTodo) =>
      mockServer
        .updateTodoInDatabase(updatedTodo.id, updatedTodo)
        .then(() => {
          dispatch({
            type: ACTIONS.UPDATE,
            payload: { updatedTodos: Array.isArray(updatedTodo) ? updatedTodo : [updatedTodo] },
          });
          if (Array.isArray(updatedTodo)) {
            dispatch({ type: ACTIONS.RESET_SELECTED_IDS });
          }
        })
        .catch(showSnackbar),
    [showSnackbar]
  );

  const deleteTodo = useCallback(
    (id) =>
      mockServer
        .deleteTodoFromDatabase(id)
        .then(() => {
          dispatch({ type: ACTIONS.DELETE, payload: { ids: Array.isArray(id) ? id : [id] } });
          if (Array.isArray(id)) {
            dispatch({ type: ACTIONS.RESET_SELECTED_IDS });
          }
        })
        .catch(showSnackbar),
    [showSnackbar]
  );

  const onTodoAction = useCallback(
    ({ type, payload }) => {
      switch (type) {
        case ACTIONS.INIT:
          initializeTodos();
          break;
        case ACTIONS.ADD:
          addTodo(payload.newTodo);
          break;
        case ACTIONS.UPDATE:
          updateTodo(payload.updatedTodo);
          break;
        case ACTIONS.DELETE:
          deleteTodo(payload.id);
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
    [addTodo, updateTodo, deleteTodo, initializeTodos]
  );

  return { todosState, onTodoAction };
};
