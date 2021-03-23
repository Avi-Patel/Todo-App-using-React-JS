import React, { useCallback } from "react/cjs/react.development";
import {
  urgencies,
  categories,
  filterPanelActions,
  urgencyToColorMap,
  categoryToIconClassMap,
} from "../constants";
import { Checkbox } from "./Checkbox";

const UrgencyPanel = React.memo(({ label, urgencyFilter, handleFilterUpdate }) => {
  return (
    <div className="filter-row top-bottom-pad8">
      <div className="normal-bold-title right-left-pad8">{label}</div>
      <div className="filter-btns">
        {Object.entries(urgencies).map(([key, value]) => {
          return (
            <button
              key={key}
              className={`icon-btn ${urgencyFilter[value] ? "filter-btn-selected" : ""}`}
              data-type={value}
              onClick={handleFilterUpdate}
            >
              <i className={`fa fa-exclamation-triangle ${urgencyToColorMap[value]}`}></i>
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
        {Object.entries(categories).map(([key, value]) => {
          return (
            <button
              key={key}
              className={`icon-btn ${categoryFilter[value] ? "filter-btn-selected" : ""}`}
              data-type={value}
              onClick={handleFilterUpdate}
            >
              <i className={`fa ${categoryToIconClassMap[value]} cwhite`}></i>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export const FilterPanel = React.memo(({ filterState, dispatch }) => {
  // name
  const toggleIsInCompleteEnabled = useCallback(
    () => dispatch({ type: filterPanelActions.TOGGLE_INCOMPLETE_ENABLED }),
    [dispatch]
  );

  const handleUrgencyFilterUpdate = useCallback(
    (event) => {
      const buttonElement = event.target.closest("[data-type]");

      if (buttonElement) {
        dispatch({
          type: filterPanelActions.UPDATE_URGENCY_FILTER,
          payload: { type: buttonElement.dataset.type },
        });
      }
    },
    [dispatch]
  );
  const handleCategoryFilterUpdate = useCallback(
    (event) => {
      const buttonElement = event.target.closest("[data-type]");

      if (buttonElement) {
        dispatch({
          type: filterPanelActions.UPDATE_CATEGORY_FILTER,
          payload: { type: buttonElement.dataset.type },
        });
      }
    },
    [dispatch]
  );

  return (
    <div className="card b12 pad8 top-bottom-mar8">
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
