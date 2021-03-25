import { useCallback, useState } from "react";

import { ACTIONS, MODAL_WINDOW_ACTIONS } from "../constants";

export const useModalWindow = (onTodoAction) => {
  const [modalWindow, SetModalWindow] = useState({
    isOpen: false,
  });

  const showModalWindow = useCallback(
    (data) =>
      SetModalWindow({
        isOpen: true,
        data,
      }),
    []
  );

  const closeModalWindow = useCallback(() => SetModalWindow({ isOpen: false }), []);

  const updateData = useCallback(
    (updatedData) => {
      closeModalWindow();
      onTodoAction({ type: ACTIONS.UPDATE, payload: { updatedTodo: updatedData } });
    },
    [closeModalWindow, onTodoAction]
  );

  const onModalWindowAction = useCallback(
    ({ type, payload }) => {
      switch (type) {
        case MODAL_WINDOW_ACTIONS.SHOW:
          showModalWindow(payload.data);
          break;
        case MODAL_WINDOW_ACTIONS.CLOSE:
          closeModalWindow();
          break;
        case MODAL_WINDOW_ACTIONS.UPDATE_DATA:
          updateData(payload.updatedData);
          break;

        default:
          break;
      }
    },
    [showModalWindow, closeModalWindow, updateData]
  );

  return { modalWindow, onModalWindowAction };
};
