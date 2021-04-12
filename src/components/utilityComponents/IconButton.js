import React from "react";

const IconButton = React.memo(({ dataType, btnClass, iconClass, onClick }) => {
  return (
    <button className={`icon-btn ${btnClass}`} data-type={dataType} onClick={onClick}>
      <i className={iconClass}></i>
    </button>
  );
});
IconButton.displayName = "IconButton";

export { IconButton };
