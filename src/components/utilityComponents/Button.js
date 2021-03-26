import React from "react";

const Button = ({ label, onClick, extraClasses }) => (
  <button className={`green-btn mar8 ${extraClasses}`} onClick={onClick}>
    {label}
  </button>
);
const _Button = React.memo(Button);

export { _Button as Button };
