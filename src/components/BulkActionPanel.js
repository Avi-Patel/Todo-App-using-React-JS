import React, { useCallback } from "react";

import { IconButton } from "./utilityComponents/IconButton";
import { WithToolTip } from "./utilityComponents/WithToolTip";

import { BULK_ACTIONS, ACTIONS } from "../constants";
import { ICON_CLASS_MAP } from "../iconClassMap";

const BulkActionPanel = ({ currentlySelectedIds, onTodoAction }) => {
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
    <div className="selection-btns fixed">
      <WithToolTip title={BULK_ACTIONS.TOGGLE_COMPLETION}>
        <IconButton
          btnClass="bg-light expand"
          iconClass={ICON_CLASS_MAP[BULK_ACTIONS.TOGGLE_COMPLETION]}
          onClick={handleBulkCompletionToggle}
        />
      </WithToolTip>
      <WithToolTip title={BULK_ACTIONS.CLEAR_SELECTION}>
        <IconButton
          btnClass="bg-light expand"
          iconClass={ICON_CLASS_MAP[BULK_ACTIONS.CLEAR_SELECTION]}
          onClick={handleClearSelection}
        />
      </WithToolTip>
      <WithToolTip title={BULK_ACTIONS.DELETE}>
        <IconButton
          btnClass="bg-light expand"
          iconClass={ICON_CLASS_MAP[BULK_ACTIONS.DELETE]}
          onClick={handleBulkDelete}
        />
      </WithToolTip>
    </div>
  );
};
const _BulkActionPanel = React.memo(BulkActionPanel);
export { _BulkActionPanel as BulkActionPanel };
