import React from "react";

const TextInput = React.memo(({ value, handleChange, placeholder, name, ref, extraClasses }) => (
  <input
    type="text"
    data-name={name}
    className={`text-input mar8 pad12 ${extraClasses ? extraClasses : ""}`}
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
  />
));

export default TextInput;
