import React, { useCallback } from "react";

import {
  URGENCY_TO_COLOR_MAP,
  CATEGORY_TO_ICON_CLASS_MAP,
  ACTIONS,
  EDIT_WINDOW_ACTIONS,
} from "../constants";

const TodoTopbarBtns = React.memo(({ handleEditTodo, handleDeleteTodo }) => {
  return (
    <div className="todo__topbar-btns">
      <button
        className="icon-btn todo__topbar-btns__extra-style alter-visibility"
        onClick={handleEditTodo}
      >
        <i className="fa fa-pencil cwhite"></i>
      </button>
      <button
        className="icon-btn todo__topbar-btns__extra-style alter-visibility"
        onClick={handleDeleteTodo}
      >
        <i className="fa fa-trash cwhite"></i>
      </button>
    </div>
  );
});

const TodoPreferences = React.memo(({ todo }) => {
  return (
    <div className="mar10">
      <span className="todo__preferences-icon mar8">
        <i className={`fa fa-exclamation-triangle ${URGENCY_TO_COLOR_MAP[todo.urgency]}`}></i>
      </span>
      <span className="todo__preferences-icon mar8">
        <i className={`fa ${CATEGORY_TO_ICON_CLASS_MAP[todo.category]} cwhite`}></i>
      </span>
    </div>
  );
});

const TodoBottombarBtns = React.memo(
  ({ todo, isSelected, handleCompletionToggle, toggleTodoSelection }) => {
    return (
      <>
        <button
          className="todo__toggle-complete-btn green-btn mar10"
          onClick={handleCompletionToggle}
        >
          {todo.completed ? "Completed Undo?" : "Mark Completed"}
        </button>
        <button
          className={` ${isSelected ? "blue-circle" : "white-circle"} mar8`}
          onClick={toggleTodoSelection}
        ></button>
      </>
    );
  }
);

const TitleAndDate = React.memo(({ todo }) => {
  return (
    <>
      <div className="normal-bold-title text-center mar10" style={{ fontSize: "18px" }}>
        {todo.title}
      </div>
      <div className="normal-title mar10" style={{ fontSize: "14px" }}>
        {todo.date}
      </div>
    </>
  );
});

const Todo = React.memo(({ todo, isSelected, onTodoAction, onEditWindowAction }) => {
  const handleCompletionToggle = useCallback(() => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    onTodoAction({ type: ACTIONS.UPDATE, payload: { updatedTodo } });
  }, [todo, onTodoAction]);

  const handleDeleteTodo = useCallback(() => {
    onTodoAction({ type: ACTIONS.DELETE, payload: { id: todo.id } });
  }, [todo, onTodoAction]);

  const toggleTodoSelection = useCallback(() => {
    onTodoAction({ type: ACTIONS.TOGGLE_FROM_SELECTED, payload: { id: todo.id } });
  }, [todo.id, onTodoAction]);

  const handleEditTodo = useCallback(() => {
    onEditWindowAction({ type: EDIT_WINDOW_ACTIONS.SHOW, payload: { data: todo } });
  }, [todo, onEditWindowAction]);

  return (
    <div
      className={`todo mar8 pad8 b12 ${todo.completed ? "reduced-opacity" : "original-opacity"}`}
    >
      <TodoTopbarBtns handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} />
      <TitleAndDate todo={todo} />
      <TodoPreferences todo={todo} />
      <TodoBottombarBtns
        todo={todo}
        isSelected={isSelected}
        handleCompletionToggle={handleCompletionToggle}
        toggleTodoSelection={toggleTodoSelection}
      />
    </div>
  );
});

export default Todo;
