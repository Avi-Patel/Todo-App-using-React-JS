import React, { useReducer, useCallback } from "react";
import { urgencies, categories, todoFormInputs, ACTIONS } from "../constants.js";
import { TodoForm } from "./TodoForm";

const uuid = () => new Date().valueOf();

const createTodoObject = (data) => {
  return {
    id: uuid(),
    date: new Date().toLocaleString(),
    title: data.title || "",
    urgency: data.urgency || urgencies.LOW,
    category: data.category || categories.PERSONAL,
    completed: false,
  };
};

const initialFormData = {
  title: "",
  urgency: urgencies.LOW,
  category: categories.PERSONAL,
};

export const CreateTodoForm = React.memo(({ onAction }) => {
  const handleSubmit = useCallback(
    (formData) => {
      if (formData.title === "") {
        return;
      }
      onAction({
        type: ACTIONS.ADD,
        payload: { newTodo: createTodoObject(formData) },
      });
    },
    [onAction]
  );

  return (
    <div className="card b12 pad12 top-bottom-mar8">
      <div className="create-todo-text mar8">Create Todo</div>
      <TodoForm initialFormData={initialFormData} handleSubmit={handleSubmit}></TodoForm>
    </div>
  );
});
