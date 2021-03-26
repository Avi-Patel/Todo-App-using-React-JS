import { useCallback, useState } from "react";

import { MODAL_WINDOW_ACTIONS } from "../constants";

//
export const useModalWindow = () => {
  const [modalWindow, SetModalWindow] = useState({
    isOpen: false,
  });

  const onModalWindowAction = useCallback(({ type, payload }) => {
    switch (type) {
      case MODAL_WINDOW_ACTIONS.SHOW:
        SetModalWindow({
          isOpen: true,
          data: payload.data,
        });
        break;

      case MODAL_WINDOW_ACTIONS.CLOSE:
        SetModalWindow({ isOpen: false });
        break;

      default:
        break;
    }
  }, []);

  return { modalWindow, onModalWindowAction };
};
