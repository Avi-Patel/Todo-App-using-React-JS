import React, { useCallback } from "react";

import { BULK_ACTIONS, ACTIONS } from "../constants";

const ButtonWithHiddenLabel = React.memo(({ label, iconClass, handleClick }) => {
  return (
    <div className="top-bottom-mar8" style={{ display: "flex", alignItems: "center" }}>
      <button className="icon-btn expand" data-type={label} onClick={handleClick}>
        <div className={`fa ${iconClass} cwhite`}></div>
      </button>
      <div className="hidden-label">{label}</div>
    </div>
  );
});

const BulkActionPanel = React.memo(({ todosState, onTodoAction }) => {
  const handleBulkCompletionToggle = useCallback(() => {
    const updatedTodo = todosState.todos.map((todo) => {
      if (todosState.currentlySelectedIds.includes(todo.id)) {
        return { ...todo, completed: !todo.completed };
      }
      return { ...todo };
    });
    onTodoAction({ type: ACTIONS.UPDATE, payload: { updatedTodo } });
  }, [todosState, onTodoAction]);

  const handleClearSelection = useCallback(
    () => onTodoAction({ type: ACTIONS.RESET_SELECTED_IDS }),
    [onTodoAction]
  );

  const handleBulkDelete = useCallback(
    () =>
      onTodoAction({
        type: ACTIONS.DELETE,
        payload: { id: todosState.currentlySelectedIds },
      }),
    [todosState.currentlySelectedIds, onTodoAction]
  );

  return (
    <div className="selection-btns fixed">
      <ButtonWithHiddenLabel
        label={BULK_ACTIONS.TOGGLE_COMPLETION}
        iconClass={"fa-check-square"}
        handleClick={handleBulkCompletionToggle}
      />
      <ButtonWithHiddenLabel
        label={BULK_ACTIONS.CLEAR_SELECTION}
        iconClass={"fa-square-o"}
        handleClick={handleClearSelection}
      />
      <ButtonWithHiddenLabel
        label={BULK_ACTIONS.DELETE}
        iconClass={"fa-minus-square"}
        handleClick={handleBulkDelete}
      />
    </div>
  );
});

export default BulkActionPanel;
