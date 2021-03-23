import { useCallback, useReducer } from "react";
import { ACTIONS } from "../constants";
import { showSnackbar } from "../snackBar";
import { mockServer } from "../mockServer";

const initialtodosState = {
  todos: [],
  currentlySelectedIds: [],
};
const findIndexById = (todos, id) => todos.findIndex((todo) => todo.id === id);

const reducer = (state, action) => {
  let index;
  switch (action.type) {
    case ACTIONS.ADD:
      return { ...state, todos: state.todos.concat(action.payload.newTodo) };

    case ACTIONS.UPDATE:
      index = findIndexById(state.todos, action.payload.updatedTodo.id);
      return {
        ...state,
        todos: state.todos
          .slice(0, index)
          .concat(action.payload.updatedTodo, state.todos.slice(index + 1)),
      };

    case ACTIONS.DELETE:
      console.log("in delete");
      index = findIndexById(state.todos, action.payload.id);
      console.log(index);
      return {
        ...state,
        todos: state.todos.slice(0, index).concat(state.todos.slice(index + 1)),
      };

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

    default:
      return state;
  }
};

export const useTodosState = () => {
  const [todosState, dispatch] = useReducer(reducer, initialtodosState);

  const addTodo = useCallback((newTodo) => {
    mockServer
      .createTodoInDatabase(newTodo)
      .then(() => {
        dispatch({ type: ACTIONS.ADD, payload: { newTodo } });
      })
      .catch(showSnackbar);
  }, []);

  const updateTodo = useCallback((updatedTodo) => {
    mockServer
      .updateTodoInDatabase(updatedTodo.ID, updatedTodo)
      .then(() => {
        dispatch({ type: ACTIONS.UPDATE, payload: { updatedTodo } });
      })
      .catch(showSnackbar);
  }, []);

  const deleteTodo = useCallback((id) => {
    mockServer
      .deleteTodoFromDatabase(id)
      .then(() => {
        dispatch({ type: ACTIONS.DELETE, payload: { id } });
      })
      .catch(showSnackbar);
  }, []);

  const onAction = useCallback(
    ({ type, payload }) => {
      switch (type) {
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
        default:
          break;
      }
    },
    [addTodo, updateTodo, deleteTodo]
  );

  return [todosState, onAction];
};
