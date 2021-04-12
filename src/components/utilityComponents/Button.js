import React from "react";

const Button = React.memo(({ label, onClick, extraClasses }) => (
  <button className={`green-btn mar8 ${extraClasses}`} onClick={onClick}>
    {label}
  </button>
));
Button.displayName = "Button";

export { Button };
