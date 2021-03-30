import { useCallback, useState } from "react";

import { MODAL_WINDOW_ACTIONS } from "../constants";

//
export const useModalWindow = () => {
  const [modalWindow, setModalWindow] = useState({
    isOpen: false,
    data: {},
  });

  const onModalWindowAction = useCallback(({ type, payload }) => {
    switch (type) {
      case MODAL_WINDOW_ACTIONS.SHOW:
        setModalWindow({
          isOpen: true,
          data: payload.data,
        });
        break;

      case MODAL_WINDOW_ACTIONS.CLOSE:
        setModalWindow({ isOpen: false, data: {} });
        break;

      default:
        break;
    }
  }, []);

  return { modalWindow, onModalWindowAction };
};
