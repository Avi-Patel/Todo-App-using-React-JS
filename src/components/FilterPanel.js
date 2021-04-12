import React, { useCallback } from "react";

import { Checkbox } from "./utilityComponents/Checkbox";
import { IconButton } from "./utilityComponents/IconButton";

import { URGENCIES, CATEGORIES, FILTER_ACTIONS } from "../constants";
import { ICON_CLASS_MAP } from "../iconClassMap";

const IconGroup = React.memo(({ label, types, filter, onFilterUpdate }) => (
  <div className="filter-row top-bottom-pad8">
    <div className="normal-bold-text cwhite pad8">{label}</div>
    <div className="filter-btns">
      {Object.entries(types).map(([key, value]) => {
        const btnClass = `right-left-mar8 ${filter[value] ? "filter-btn-selected" : ""}`;
        const iconClass = `${label === "Category" ? "cwhite" : ""}`;
        return (
          <IconButton
            key={key}
            btnClass={btnClass}
            dataType={value}
            iconClass={`${ICON_CLASS_MAP[value]} ${iconClass}`}
            onClick={onFilterUpdate}
          />
        );
      })}
    </div>
  </div>
));
IconGroup.displayName = "IconGroup";

const FilterPanel = React.memo(({ appliedFilter, onFilterAction }) => {
  //Doubt: name
  const toggleShowInComplete = useCallback(
    () => onFilterAction({ type: FILTER_ACTIONS.TOGGLE_SHOW_INCOMPLETE }),
    [onFilterAction]
  );

  //
  const updateUrgencyFilter = useCallback(
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
  const updateCategoryFilter = useCallback(
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
      <IconGroup
        label="Urgency"
        types={URGENCIES}
        filter={appliedFilter.urgencyFilter}
        onFilterUpdate={updateUrgencyFilter}
      />
      <IconGroup
        label="Category"
        types={CATEGORIES}
        filter={appliedFilter.categoryFilter}
        onFilterUpdate={updateCategoryFilter}
      />
      <Checkbox
        label="Incomplete Todos"
        labelColorClass="cwhite"
        isChecked={appliedFilter.showInComplete}
        onChange={toggleShowInComplete}
      />
      <div className="normal-bold-text cwhite top-bottom-pad8">Filter Todos</div>
    </div>
  );
});
FilterPanel.displayName = "FilterPanel";
export { FilterPanel };
