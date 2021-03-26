import React from "react";

const TextInput = ({ value, onChange, placeholder, name, extraClasses }) => (
  <input
    type="text"
    data-name={name}
    value={value}
    className={`text-input mar8 pad12 ${extraClasses ? extraClasses : ""}`}
    placeholder={placeholder}
    onChange={onChange}
  />
);

const _TextInput = React.memo(TextInput);
export { _TextInput as TextInput };
