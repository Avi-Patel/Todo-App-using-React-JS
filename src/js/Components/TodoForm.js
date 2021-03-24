import React from "react";

import TextInput from "./TextInput";
import Dropdown from "./Dropdown";

import { URGENCIES, CATEGORIES, TODO_FORM_INPUTS } from "../constants";

// reusable TodoForm, will use it in todo Edit Window too.
const TodoForm = React.memo(({ formData, handleFormChange }) => {
  return (
    <div className="form">
      <TextInput
        name={TODO_FORM_INPUTS.TITLE}
        placeholder="Add Todo Title"
        value={formData.title}
        handleChange={handleFormChange}
      />

      <div className="normal-bold-title mar8">{TODO_FORM_INPUTS.URGENCY}</div>
      <Dropdown
        name={TODO_FORM_INPUTS.URGENCY}
        initialValue={formData.urgency}
        values={URGENCIES}
        handleChange={handleFormChange}
      />

      <div className="normal-bold-title mar8">{TODO_FORM_INPUTS.CATEGORY}</div>
      <Dropdown
        name={TODO_FORM_INPUTS.CATEGORY}
        initialValue={formData.category}
        values={CATEGORIES}
        handleChange={handleFormChange}
      />
    </div>
  );
});

export default TodoForm;
