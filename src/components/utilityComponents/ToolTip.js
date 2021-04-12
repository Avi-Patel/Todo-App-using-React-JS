import React, { useState, useCallback } from "react";

const Tooltip = ({ children, title }) => {
  const [show, setShow] = useState(false);

  const handleOnHover = useCallback(() => setShow(true), []);
  const handleHoverOut = useCallback(() => setShow(false), []);

  return (
    <div
      className="top-bottom-mar8"
      style={{ display: "flex", alignItems: "center" }}
      onMouseOver={handleOnHover}
      onMouseOut={handleHoverOut}
    >
      {children}
      {show && <div className="tooltip-title">{title}</div>}
    </div>
  );
};
export { Tooltip };
