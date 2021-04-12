import React from "react";

const Checkbox = React.memo(({ label, labelColorClass, isChecked, onChange }) => (
  <div className="check-box-row mar8 pad8">
    <input type="checkbox" className="check-box mar8" checked={isChecked} onChange={onChange} />
    <div className={`normal-bold-text ${labelColorClass}`}>{label}</div>
  </div>
));

Checkbox.displayName = "Checkbox";
export { Checkbox };
