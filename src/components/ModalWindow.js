import React from "react";

export const ModalWindow = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__modal-content b12 pad12">{children}</div>
    </div>
  );
};
