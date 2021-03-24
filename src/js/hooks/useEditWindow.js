import { useCallback, useState } from "react";

import { ACTIONS, EDIT_WINDOW_ACTIONS } from "../constants";

export const useEditWindow = (onTodoAction) => {
  const [editWindowData, setEditWindowData] = useState({
    isOpen: false,
  });

  const showEditWindow = useCallback(
    (data) =>
      setEditWindowData({
        isOpen: true,
        payload: data,
      }),
    []
  );

  const closeEditWindow = useCallback(() => setEditWindowData({ isOpen: false }), []);

  const updateData = useCallback(
    (updatedData) => {
      closeEditWindow();
      onTodoAction({ type: ACTIONS.UPDATE, payload: { updatedTodo: updatedData } });
    },
    [closeEditWindow, onTodoAction]
  );

  const onEditWindowAction = useCallback(
    ({ type, payload }) => {
      switch (type) {
        case EDIT_WINDOW_ACTIONS.SHOW:
          showEditWindow(payload.data);
          break;
        case EDIT_WINDOW_ACTIONS.CLOSE:
          closeEditWindow();
          break;
        case EDIT_WINDOW_ACTIONS.UPDATE_DATA:
          updateData(payload.updatedData);
          break;

        default:
          break;
      }
    },
    [showEditWindow, closeEditWindow, updateData]
  );

  return [editWindowData, onEditWindowAction];
};
