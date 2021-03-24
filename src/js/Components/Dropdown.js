import React from "react";

const Dropdown = React.memo(({ name, initialValue, values, handleChange }) => {
  return (
    <select
      data-name={name}
      value={initialValue}
      className="dropdown mar8 pad12"
      onChange={handleChange}
    >
      {Object.keys(values).map((key) => {
        return (
          <option key={key} value={values[key]}>
            {values[key][0].toUpperCase() + values[key].slice(1)}
          </option>
        );
      })}
    </select>
  );
});

export default Dropdown;
