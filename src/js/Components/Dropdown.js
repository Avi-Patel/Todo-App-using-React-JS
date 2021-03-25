import React from "react";

export const Dropdown = React.memo(({ name, initialValue, values, onChange }) => (
  <select data-name={name} value={initialValue} className="dropdown mar8 pad12" onChange={onChange}>
    {Object.entries(values).map(([key, value]) => (
      <option key={key} value={value}>
        {value[0].toUpperCase() + value.slice(1)}
      </option>
    ))}
  </select>
));
