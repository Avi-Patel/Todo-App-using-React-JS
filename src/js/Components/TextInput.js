import React from "react";

export const TextInput = React.memo(({ value, onChange, placeholder, name, extraClasses }) => (
  <input
    type="text"
    data-name={name}
    value={value}
    className={`text-input mar8 pad12 ${extraClasses ? extraClasses : ""}`}
    placeholder={placeholder}
    onChange={onChange}
  />
));
