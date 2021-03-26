import React from "react";

const IconButton = ({ dataType, btnClass, iconClass, onClick }) => {
  return (
    <button className={`icon-btn ${btnClass}`} data-type={dataType} onClick={onClick}>
      <i className={iconClass}></i>
    </button>
  );
};
const _IconButton = React.memo(IconButton);

export { _IconButton as IconButton };
