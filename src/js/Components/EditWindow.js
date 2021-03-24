import React, { useCallback, useReducer } from "react";

import TodoForm from "./TodoForm";

import { EDIT_WINDOW_ACTIONS, TODO_FORM_INPUTS, ACTIONS } from "../constants";

const reducer = (state, action) => {
  switch (action.name) {
    case TODO_FORM_INPUTS.TITLE:
      return { ...state, title: action.payload.newValue };
    case TODO_FORM_INPUTS.URGENCY:
      return { ...state, urgency: action.payload.newValue };
    case TODO_FORM_INPUTS.CATEGORY:
      return { ...state, category: action.payload.newValue };
    case ACTIONS.RESET:
      return { ...action.payload.initialFormData };
    default:
      return state;
  }
};

const EditWindow = ({ todo, onEditWindowAction }) => {
  const [formData, dispatch] = useReducer(reducer, todo);

  const handleFormChange = useCallback((event) => {
    dispatch({ name: event.target.dataset.name, payload: { newValue: event.target.value } });
  }, []);

  const handleUpdate = useCallback(() => {
    if (formData.title === "") {
      return;
    }
    onEditWindowAction({
      type: EDIT_WINDOW_ACTIONS.UPDATE_DATA,
      payload: { updatedData: formData },
    });
  }, [onEditWindowAction, formData]);

  const handleCancel = useCallback(() => onEditWindowAction({ type: EDIT_WINDOW_ACTIONS.CLOSE }), [
    onEditWindowAction,
  ]);

  return (
    <div className="updateModal">
      <div className="modalContent b12 pad12">
        <div className="cwhite normal-bold-title top-bottom-mar8">Update Your Data</div>
        <TodoForm formData={formData} handleFormChange={handleFormChange} />
        <div>
          <button className="green-btn mar8" onClick={handleUpdate}>
            Update
          </button>
          <button className="green-btn mar8" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWindow;
