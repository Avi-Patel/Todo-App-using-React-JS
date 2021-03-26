import React, { useCallback, useState } from "react";

import { TodoForm } from "./TodoForm";

import { URGENCIES, CATEGORIES, ACTIONS } from "../constants.js";

const uuid = () => new Date().valueOf();

const createTodoObject = (data) => ({
  id: uuid(),
  date: new Date().toLocaleString(),
  title: data.title || "",
  urgency: data.urgency || URGENCIES.LOW,
  category: data.category || CATEGORIES.PERSONAL,
  completed: false,
});

const INITIAL_FORM_DATA = {
  title: "",
  urgency: URGENCIES.LOW,
  category: CATEGORIES.PERSONAL,
};

const CreateTodoForm = ({ onTodoAction }) => {
  // single useState
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleFormChange = useCallback(
    (event) =>
      setFormData((prevFormData) => ({
        ...prevFormData,
        [event.target.dataset.name]: event.target.value,
      })),
    []
  );

  const handleSubmit = useCallback(() => {
    if (formData.title === "") {
      return;
    }
    onTodoAction({
      type: ACTIONS.ADD,
      payload: { newTodos: createTodoObject(formData) },
    });
    setFormData(INITIAL_FORM_DATA);
  }, [onTodoAction, formData]);

  return (
    <div className="card b12 pad8 top-mar8">
      <div className="create-todo-text mar8">Create Todo</div>
      <TodoForm formData={formData} onFormChange={handleFormChange}></TodoForm>
      <button className="icon-btn todo-add-btn" onClick={handleSubmit}>
        <div className="fa fa-plus cwhite"></div>
      </button>
    </div>
  );
};
const _CreateTodoForm = React.memo(CreateTodoForm);
export { _CreateTodoForm as CreateTodoForm };
