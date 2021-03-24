import React from "react";

const Checkbox = React.memo(({ label, isChecked, handleChange }) => {
  return (
    <div className="check-box-row mar8 pad8">
      <input
        type="checkbox"
        className="check-box mar8"
        checked={isChecked}
        onChange={handleChange}
      />
      <div className="normal-bold-title">{label}</div>
    </div>
  );
});

export default Checkbox;
