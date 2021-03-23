import React from "react";
import { BULK_ACTIONS } from "../constants";

const ButtonWithHiddenLabel = ({ label, iconClass }) => {
  return (
    <div className="top-bottom-mar8" style={{ display: "flex", alignItems: "center" }}>
      <button className="icon-btn expand">
        <div className={`fa ${iconClass} cwhite`}></div>
      </button>
      <div className="hidden-label">{label}</div>
    </div>
  );
};

export const BulkActionPanel = React.memo(() => {
  return (
    <div className="selection-btns fixed">
      <ButtonWithHiddenLabel label={BULK_ACTIONS.TOGGLE_COMPLETION} iconClass={"fa-check-square"} />
      <ButtonWithHiddenLabel label={BULK_ACTIONS.CLEAR_SELECTION} iconClass={"fa-square-o"} />
      <ButtonWithHiddenLabel label={BULK_ACTIONS.DELETE} iconClass={"fa-minus-square"} />
    </div>
  );
});
