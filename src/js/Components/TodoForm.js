import React from "react";

import { TextInput } from "./TextInput";
import { Dropdown } from "./Dropdown";

import { URGENCIES, CATEGORIES, TODO_FORM_INPUTS } from "../constants";

export const TodoForm = React.memo(({ formData, onFormChange }) => (
  <div className="form">
    <TextInput
      name={TODO_FORM_INPUTS.TITLE.toLocaleLowerCase()}
      value={formData.title}
      placeholder="Add Todo Title"
      onChange={onFormChange}
    />

    <div className="normal-bold-text mar8">{TODO_FORM_INPUTS.URGENCY}</div>
    <Dropdown
      name={TODO_FORM_INPUTS.URGENCY.toLocaleLowerCase()}
      initialValue={formData.urgency}
      values={URGENCIES}
      onChange={onFormChange}
    />

    <div className="normal-bold-text mar8">{TODO_FORM_INPUTS.CATEGORY}</div>
    <Dropdown
      name={TODO_FORM_INPUTS.CATEGORY.toLocaleLowerCase()}
      initialValue={formData.category}
      values={CATEGORIES}
      onChange={onFormChange}
    />
  </div>
));
