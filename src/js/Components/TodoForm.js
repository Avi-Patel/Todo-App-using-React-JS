import React, { useReducer, useCallback } from "react";
import { urgencies, categories, todoFormInputs, ACTIONS } from "../constants";
import { TextInput } from "./TextInput";
import { Dropdown } from "./Dropdown";

const reducer = (state, action) => {
  switch (action.type) {
    case todoFormInputs.TITLE:
      return { ...state, title: action.payload.newValue };
    case todoFormInputs.URGENCY:
      return { ...state, urgency: action.payload.newValue };
    case todoFormInputs.CATEGORY:
      return { ...state, category: action.payload.newValue };
    case ACTIONS.RESET:
      return { ...action.payload.initialFormData };
    default:
      return state;
  }
};

// reusable TodoForm, will use it in todo Edit Window too.
export const TodoForm = React.memo(({ initialFormData, handleSubmit }) => {
  const [formData, dispatch] = useReducer(reducer, initialFormData);

  const handleFormChange = useCallback((event) => {
    dispatch({ type: event.target.dataset.name, payload: { newValue: event.target.value } });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    dispatch({ type: ACTIONS.RESET, payload: { initialFormData } });
  };

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <div className="normal-bold-title mar8">Title</div>
      <TextInput
        name={todoFormInputs.TITLE}
        placeholder="Add Todo Title"
        value={formData.title}
        handleChange={handleFormChange}
      />

      <div className="normal-bold-title mar8">Urgency</div>
      <Dropdown
        name={todoFormInputs.URGENCY}
        initialValue={formData.urgency}
        values={urgencies}
        handleChange={handleFormChange}
      />

      <div className="normal-bold-title mar8">Category</div>
      <Dropdown
        name={todoFormInputs.CATEGORY}
        initialValue={formData.category}
        values={categories}
        handleChange={handleFormChange}
      />
    </form>
  );
});
