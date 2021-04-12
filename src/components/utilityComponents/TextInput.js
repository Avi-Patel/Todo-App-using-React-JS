import React from "react";

const TextInput = React.memo(({ value, onChange, placeholder, name, extraClasses }) => (
  <input
    type="text"
    data-name={name}
    value={value}
    className={`text-input mar8 pad12 ${extraClasses ? extraClasses : ""}`}
    placeholder={placeholder}
    onChange={onChange}
  />
));
TextInput.displayName = "Text Input";
export { TextInput };
