import React, { useCallback, useReducer } from "react";

import TodoForm from "./TodoForm";

import { URGENCIES, CATEGORIES, ACTIONS, TODO_FORM_INPUTS } from "../constants.js";

const uuid = () => new Date().valueOf();

const createTodoObject = (data) => {
  return {
    id: uuid(),
    date: new Date().toLocaleString(),
    title: data.title || "",
    urgency: data.urgency || URGENCIES.LOW,
    category: data.category || CATEGORIES.PERSONAL,
    completed: false,
  };
};

const initialFormData = {
  title: "",
  urgency: URGENCIES.LOW,
  category: CATEGORIES.PERSONAL,
};
const reducer = (state, action) => {
  switch (action.name) {
    case TODO_FORM_INPUTS.TITLE:
      return { ...state, title: action.payload.newValue };
    case TODO_FORM_INPUTS.URGENCY:
      return { ...state, urgency: action.payload.newValue };
    case TODO_FORM_INPUTS.CATEGORY:
      return { ...state, category: action.payload.newValue };
    case ACTIONS.RESET:
      return { ...initialFormData };
    default:
      return state;
  }
};

const CreateTodoForm = React.memo(({ onTodoAction }) => {
  const [formData, dispatch] = useReducer(reducer, initialFormData);

  const handleFormChange = useCallback((event) => {
    dispatch({ name: event.target.dataset.name, payload: { newValue: event.target.value } });
  }, []);

  const handleSubmit = useCallback(() => {
    if (formData.title === "") {
      return;
    }
    onTodoAction({
      type: ACTIONS.ADD,
      payload: { newTodo: createTodoObject(formData) },
    });
    dispatch({ name: ACTIONS.RESET });
  }, [onTodoAction, formData]);

  return (
    <div className="card b12 pad8 top-mar8">
      <div className="create-todo-text mar8">Create Todo</div>
      <TodoForm formData={formData} handleFormChange={handleFormChange}></TodoForm>
      <button className="icon-btn todo-add-btn" onClick={handleSubmit}>
        <div className="fa fa-plus cwhite"></div>
      </button>
    </div>
  );
});

export default CreateTodoForm;
