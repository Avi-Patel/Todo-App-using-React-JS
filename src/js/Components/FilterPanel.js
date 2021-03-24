import React, { useCallback } from "react/cjs/react.development";

import Checkbox from "./Checkbox";

import {
  URGENCIES,
  CATEGORIES,
  FILTER_ACTIONS,
  URGENCY_TO_COLOR_MAP,
  CATEGORY_TO_ICON_CLASS_MAP,
} from "../constants";

const UrgencyPanel = React.memo(({ label, urgencyFilter, handleFilterUpdate }) => {
  return (
    <div className="filter-row top-bottom-pad8">
      <div className="normal-bold-title right-left-pad8">{label}</div>
      <div className="filter-btns">
        {Object.entries(URGENCIES).map(([key, value]) => {
          return (
            <button
              key={key}
              className={`icon-btn ${urgencyFilter[value] ? "filter-btn-selected" : ""}`}
              data-type={value}
              onClick={handleFilterUpdate}
            >
              <i className={`fa fa-exclamation-triangle ${URGENCY_TO_COLOR_MAP[value]}`}></i>
            </button>
          );
        })}
      </div>
    </div>
  );
});

const CategoryPanel = React.memo(({ label, categoryFilter, handleFilterUpdate }) => {
  return (
    <div className="filter-row top-bottom-pad8">
      <div className="normal-bold-title right-left-pad8">{label}</div>
      <div className="filter-btns">
        {Object.entries(CATEGORIES).map(([key, value]) => {
          return (
            <button
              key={key}
              className={`icon-btn ${categoryFilter[value] ? "filter-btn-selected" : ""}`}
              data-type={value}
              onClick={handleFilterUpdate}
            >
              <i className={`fa ${CATEGORY_TO_ICON_CLASS_MAP[value]} cwhite`}></i>
            </button>
          );
        })}
      </div>
    </div>
  );
});

const FilterPanel = React.memo(({ filterState, onFilterAction }) => {
  // name
  const toggleIsInCompleteEnabled = useCallback(
    () => onFilterAction({ type: FILTER_ACTIONS.TOGGLE_INCOMPLETE_ENABLED }),
    [onFilterAction]
  );

  const handleUrgencyFilterUpdate = useCallback(
    (event) => {
      const buttonElement = event.target.closest("[data-type]");

      if (buttonElement) {
        onFilterAction({
          type: FILTER_ACTIONS.UPDATE_URGENCY_FILTER,
          payload: { type: buttonElement.dataset.type },
        });
      }
    },
    [onFilterAction]
  );
  const handleCategoryFilterUpdate = useCallback(
    (event) => {
      const buttonElement = event.target.closest("[data-type]");

      if (buttonElement) {
        onFilterAction({
          type: FILTER_ACTIONS.UPDATE_CATEGORY_FILTER,
          payload: { type: buttonElement.dataset.type },
        });
      }
    },
    [onFilterAction]
  );

  return (
    <div className="card b12 pad8">
      <UrgencyPanel
        label="Urgency"
        urgencyFilter={filterState.urgencyFilter}
        handleFilterUpdate={handleUrgencyFilterUpdate}
      />
      <CategoryPanel
        label="Category"
        categoryFilter={filterState.categoryFilter}
        handleFilterUpdate={handleCategoryFilterUpdate}
      />
      <Checkbox
        label="Not Completed"
        isChecked={filterState.isIncompleteEnabled}
        handleChange={toggleIsInCompleteEnabled}
      />
      <div className="normal-bold-title top-bottom-pad8">Filter Todos</div>
    </div>
  );
});

export default FilterPanel;
