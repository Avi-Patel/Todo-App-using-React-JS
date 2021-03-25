import React, { useCallback } from "react";

import { BULK_ACTIONS, ACTIONS, BULK_ACTIONS_ICON_CLASS } from "../constants";

const ButtonWithHiddenLabel = React.memo(({ label, iconClass, onClick }) => {
  return (
    <div className="top-bottom-mar8" style={{ display: "flex", alignItems: "center" }}>
      <button className="icon-btn expand" data-type={label} onClick={onClick}>
        <div className={`fa ${iconClass} cwhite`}></div>
      </button>
      <div className="hidden-label">{label}</div>
    </div>
  );
});

export const BulkActionPanel = React.memo(({ todosData, onTodoAction }) => {
  const handleBulkCompletionToggle = useCallback(() => {
    const updatedTodo = todosData.todos.map((todo) => {
      if (todosData.currentlySelectedIds.includes(todo.id)) {
        return { ...todo, completed: !todo.completed };
      }
      return { ...todo };
    });
    onTodoAction({ type: ACTIONS.UPDATE, payload: { updatedTodo } });
  }, [todosData, onTodoAction]);

  const handleClearSelection = useCallback(
    () => onTodoAction({ type: ACTIONS.RESET_SELECTED_IDS }),
    [onTodoAction]
  );

  const handleBulkDelete = useCallback(
    () =>
      onTodoAction({
        type: ACTIONS.DELETE,
        payload: { id: todosData.currentlySelectedIds },
      }),
    [todosData.currentlySelectedIds, onTodoAction]
  );

  return (
    <div className="selection-btns fixed">
      <ButtonWithHiddenLabel
        label={BULK_ACTIONS.TOGGLE_COMPLETION}
        iconClass={BULK_ACTIONS_ICON_CLASS[BULK_ACTIONS.TOGGLE_COMPLETION]}
        onClick={handleBulkCompletionToggle}
      />
      <ButtonWithHiddenLabel
        label={BULK_ACTIONS.CLEAR_SELECTION}
        iconClass={BULK_ACTIONS_ICON_CLASS[BULK_ACTIONS.CLEAR_SELECTION]}
        onClick={handleClearSelection}
      />
      <ButtonWithHiddenLabel
        label={BULK_ACTIONS.DELETE}
        iconClass={BULK_ACTIONS_ICON_CLASS[BULK_ACTIONS.DELETE]}
        onClick={handleBulkDelete}
      />
    </div>
  );
});
