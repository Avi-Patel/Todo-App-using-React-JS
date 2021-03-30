import React from "react";

import { ICON_CLASS_MAP } from "../iconClassMap";
import { MODAL_WINDOW_ACTIONS } from "../constants";

export const ModalWindow = ({ children, onModalWindowAction }) => {
  const closeModal = () => onModalWindowAction({ type: MODAL_WINDOW_ACTIONS.CLOSE });

  return (
    <div className="modal">
      <div className="modal__modal-content b12 pad12">
        <div className="modal-close-btn" onClick={closeModal}>
          <i className={ICON_CLASS_MAP.CLOSE}></i>
        </div>
        {children}
      </div>
    </div>
  );
};
