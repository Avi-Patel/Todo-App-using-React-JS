import React from "react";

import { urgencyToColorMap, categoryToIconClassMap, ACTIONS } from "../constants";

export const Todo = React.memo(({ todo, isSelected, onAction }) => {
  const handleCompletionToggle = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    onAction({ type: ACTIONS.UPDATE, payload: { updatedTodo } });
  };

  const handleDelete = () => {
    onAction({ type: ACTIONS.DELETE, payload: { id: todo.id } });
  };

  const toggleTodoSelection = () => {
    onAction({ type: ACTIONS.TOGGLE_FROM_SELECTED, payload: { id: todo.id } });
  };

  return (
    <div
      className={`todo mar8 pad8 b12 ${todo.completed ? "reduced-opacity" : "original-opacity"}`}
    >
      <div className="todo__topbar-btns">
        <button className="icon-btn todo__topbar-btns__extra-style alter-visibility">
          <i className="fa fa-pencil cwhite"></i>
        </button>
        <button
          className="icon-btn todo__topbar-btns__extra-style alter-visibility"
          onClick={handleDelete}
        >
          <i className="fa fa-trash cwhite"></i>
        </button>
      </div>
      <div className="normal-bold-title text-center mar10" style={{ fontSize: "18px" }}>
        {todo.title}
      </div>
      <div className="normal-title mar10" style={{ fontSize: "14px" }}>
        {todo.date}
      </div>
      <div className="mar10">
        <span className="todo__preferences-icon mar8">
          <i className={`fa fa-exclamation-triangle ${urgencyToColorMap[todo.urgency]}`}></i>
        </span>
        <span className="todo__preferences-icon mar8">
          <i className={`fa ${categoryToIconClassMap[todo.category]} cwhite`}></i>
        </span>
      </div>
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
    </div>
  );
});
