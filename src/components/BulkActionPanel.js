import React, { useCallback } from "react";

import { IconButton } from "./utilityComponents/IconButton";
import { Tooltip } from "./utilityComponents/ToolTip";

import { BULK_ACTIONS, ACTIONS } from "../constants";
import { ICON_CLASS_MAP } from "../iconClassMap";

const BulkActionPanel = React.memo(({ currentlySelectedIds, onTodoAction }) => {
  const handleBulkCompletionToggle = useCallback(() => {
    onTodoAction({ type: ACTIONS.TOGGLE_COMPLETION, payload: { ids: currentlySelectedIds } });
  }, [currentlySelectedIds, onTodoAction]);

  const handleClearSelection = useCallback(
    () => onTodoAction({ type: ACTIONS.RESET_SELECTED_IDS }),
    [onTodoAction]
  );

  const handleBulkDelete = useCallback(
    () =>
      onTodoAction({
        type: ACTIONS.DELETE,
        payload: { ids: currentlySelectedIds },
      }),
    [currentlySelectedIds, onTodoAction]
  );

  return (
    <div className="bulk-action-btns bulk-actions-position">
      <Tooltip title={BULK_ACTIONS.TOGGLE_COMPLETION}>
        <IconButton
          btnClass="right-left-mar8 bg-light"
          iconClass={`${ICON_CLASS_MAP[BULK_ACTIONS.TOGGLE_COMPLETION]} cblack`}
          onClick={handleBulkCompletionToggle}
        />
      </Tooltip>
      <Tooltip title={BULK_ACTIONS.CLEAR_SELECTION}>
        <IconButton
          btnClass="right-left-mar8 bg-light"
          iconClass={`${ICON_CLASS_MAP[BULK_ACTIONS.CLEAR_SELECTION]} cblack`}
          onClick={handleClearSelection}
        />
      </Tooltip>
      <Tooltip title={BULK_ACTIONS.DELETE}>
        <IconButton
          btnClass="right-left-mar8 bg-light"
          iconClass={`${ICON_CLASS_MAP[BULK_ACTIONS.DELETE]} cblack`}
          onClick={handleBulkDelete}
        />
      </Tooltip>
    </div>
  );
});
BulkActionPanel.displayName = "BulkActionPanel";
export { BulkActionPanel };
