import React from "react";

const Checkbox = ({ label, isChecked, onChange }) => (
  <div className="check-box-row mar8 pad8">
    <input type="checkbox" className="check-box mar8" checked={isChecked} onChange={onChange} />
    <div className="normal-bold-text">{label}</div>
  </div>
);

const _Checkbox = React.memo(Checkbox);
export { _Checkbox as Checkbox };
