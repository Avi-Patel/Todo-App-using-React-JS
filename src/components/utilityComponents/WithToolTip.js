import React, { useState, useCallback } from "react";

const WithToolTip = ({ children, title }) => {
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
      {show && <div className="hidden-label">{title}</div>}
    </div>
  );
};
export { WithToolTip };
