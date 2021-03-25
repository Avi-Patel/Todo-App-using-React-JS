import React from "react";

export const Checkbox = React.memo(({ label, isChecked, onChange }) => (
  <div className="check-box-row mar8 pad8">
    <input type="checkbox" className="check-box mar8" checked={isChecked} onChange={onChange} />
    <div className="normal-bold-text">{label}</div>
  </div>
));
