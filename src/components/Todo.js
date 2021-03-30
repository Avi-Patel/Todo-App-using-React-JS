import React, { useCallback } from "react";

import { Button } from "./utilityComponents/Button";
import { IconButton } from "./utilityComponents/IconButton";

import { ACTIONS, MODAL_WINDOW_ACTIONS } from "../constants";
import { ICON_CLASS_MAP } from "../iconClassMap";

// Doubt: onModalWindowAction
const Todo = React.memo(({ todo, isSelected, onTodoAction, onModalWindowAction }) => {
  // should i define all these  handlers here or they should be defined in TodoList?.
  //Because, for All Todo Components there will be 4 function objects using the memory
  // 100 Todos means 400 function objects.

  const handleCompletionToggle = useCallback(() => {
    onTodoAction({ type: ACTIONS.TOGGLE_COMPLETION, payload: { ids: todo.id } });
  }, [todo, onTodoAction]);

  const handleDeleteTodo = useCallback(
    () => onTodoAction({ type: ACTIONS.DELETE, payload: { ids: todo.id } }),
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
      <div className="todo__topbar-btns">
        <IconButton
          btnClass="todo__topbar-btns__extra-style alter-visibility"
          iconClass={ICON_CLASS_MAP[ACTIONS.EDIT]}
          onClick={handleEditTodo}
        />
        <IconButton
          btnClass="todo__topbar-btns__extra-style alter-visibility"
          iconClass={ICON_CLASS_MAP[ACTIONS.DELETE]}
          onClick={handleDeleteTodo}
        />
      </div>
      <div className="normal-bold-text align-center mar10" style={{ fontSize: "18px" }}>
        {todo.title}
      </div>
      <div className="normal-text align-center mar10" style={{ fontSize: "14px" }}>
        {todo.date}
      </div>
      <div className="align-center mar10">
        <i className={` ${ICON_CLASS_MAP[todo.urgency]} todo__preferences-icon mar8`}></i>
        <i className={` ${ICON_CLASS_MAP[todo.category]} todo__preferences-icon mar8`}></i>
      </div>
      <Button
        label={`${todo.completed ? "Completed Undo?" : "Mark Completed"}`}
        onClick={handleCompletionToggle}
        extraClasses="todo__toggle-complete-btn mar10"
      />
      <button
        className={` ${isSelected ? "blue-circle" : "white-circle"} mar8`}
        onClick={toggleTodoSelection}
      ></button>
    </div>
  );
});
Todo.displayName = "Todo";
export { Todo };
