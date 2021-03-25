import React, { useCallback } from "react";

import { Button } from "./Button";

import {
  URGENCY_TO_COLOR_MAP,
  CATEGORY_TO_ICON_CLASS_MAP,
  ACTIONS,
  MODAL_WINDOW_ACTIONS,
} from "../constants";

const TodoTopbarBtns = React.memo(({ onEditTodo, onDeleteTodo }) => (
  <div className="todo__topbar-btns">
    <button
      className="icon-btn todo__topbar-btns__extra-style alter-visibility"
      onClick={onEditTodo}
    >
      <i className="fa fa-pencil cwhite"></i>
    </button>
    <button
      className="icon-btn todo__topbar-btns__extra-style alter-visibility"
      onClick={onDeleteTodo}
    >
      <i className="fa fa-trash cwhite"></i>
    </button>
  </div>
));

const TitleAndDate = React.memo(({ title, date }) => (
  <>
    <div className="normal-bold-text text-center mar10" style={{ fontSize: "18px" }}>
      {title}
    </div>
    <div className="normal-text mar10" style={{ fontSize: "14px" }}>
      {date}
    </div>
  </>
));

const TodoPreferences = React.memo(({ urgency, category }) => (
  <div className="mar10">
    <span className="todo__preferences-icon mar8">
      <i className={`fa fa-exclamation-triangle ${URGENCY_TO_COLOR_MAP[urgency]}`}></i>
    </span>
    <span className="todo__preferences-icon mar8">
      <i className={`fa ${CATEGORY_TO_ICON_CLASS_MAP[category]} cwhite`}></i>
    </span>
  </div>
));

const TodoBottombarBtns = React.memo(
  ({ todo, isSelected, onCompletionToggle, onSelectionToggle }) => (
    <>
      <Button
        label={`${todo.completed ? "Completed Undo?" : "Mark Completed"}`}
        onClick={onCompletionToggle}
        extraClasses="todo__toggle-complete-btn mar10"
      />
      <button
        className={` ${isSelected ? "blue-circle" : "white-circle"} mar8`}
        onClick={onSelectionToggle}
      ></button>
    </>
  )
);

export const Todo = React.memo(({ todo, isSelected, onTodoAction, onModalWindowAction }) => {
  const handleCompletionToggle = useCallback(() => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    onTodoAction({ type: ACTIONS.UPDATE, payload: { updatedTodo } });
  }, [todo, onTodoAction]);

  const handleDeleteTodo = useCallback(
    () => onTodoAction({ type: ACTIONS.DELETE, payload: { id: todo.id } }),
    [todo, onTodoAction]
  );

  const toggleTodoSelection = useCallback(
    () => onTodoAction({ type: ACTIONS.TOGGLE_FROM_SELECTED, payload: { id: todo.id } }),
    [todo.id, onTodoAction]
  );

  const handleEditTodo = useCallback(
    () => onModalWindowAction({ type: MODAL_WINDOW_ACTIONS.SHOW, payload: { data: todo } }),
    [todo, onModalWindowAction]
  );

  return (
    <div
      className={`todo mar8 pad8 b12 ${todo.completed ? "reduced-opacity" : "original-opacity"}`}
    >
      <TodoTopbarBtns onEditTodo={handleEditTodo} onDeleteTodo={handleDeleteTodo} />
      <TitleAndDate title={todo.title} date={todo.date} />
      <TodoPreferences urgency={todo.urgency} category={todo.category} />
      <TodoBottombarBtns
        todo={todo}
        isSelected={isSelected}
        onCompletionToggle={handleCompletionToggle}
        onSelectionToggle={toggleTodoSelection}
      />
    </div>
  );
});
