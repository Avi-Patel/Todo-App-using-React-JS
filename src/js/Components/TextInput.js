import React from "react";

export const TextInput = React.memo(({ value, handleChange, placeholder, name, extraClasses }) => (
  <input
    type="text"
    data-name={name}
    className={`text-input mar8 pad12 ${extraClasses ? extraClasses : ""}`}
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
  />
));
