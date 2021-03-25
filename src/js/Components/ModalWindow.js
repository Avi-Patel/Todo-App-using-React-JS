import React, { useCallback, useState } from "react";

import { TodoForm } from "./TodoForm";
import { Button } from "./Button";

import { MODAL_WINDOW_ACTIONS } from "../constants";

export const ModalWindow = ({ todo, onModalWindowAction }) => {
  const [formData, setFormData] = useState(todo);

  const handleFormChange = useCallback(
    (event) =>
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.dataset.name]: event.target.value,
      })),
    []
  );

  const handleUpdate = useCallback(() => {
    if (formData.title === "") {
      return;
    }
    onModalWindowAction({
      type: MODAL_WINDOW_ACTIONS.UPDATE_DATA,
      payload: { updatedData: formData },
    });
  }, [onModalWindowAction, formData]);

  const handleCancel = useCallback(
    () => onModalWindowAction({ type: MODAL_WINDOW_ACTIONS.CLOSE }),
    [onModalWindowAction]
  );

  return (
    <div className="modal">
      <div className="modal__modal-content b12 pad12">
        <div className="cwhite normal-bold-text top-bottom-mar8">Update Your Data</div>
        <TodoForm formData={formData} onFormChange={handleFormChange} />
        <div>
          <Button label="Update" onClick={handleUpdate} />
          <Button label="Cancel" onClick={handleCancel} />
        </div>
      </div>
    </div>
  );
};
