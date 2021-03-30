import { useState, useCallback } from "react";
import {} from "react/cjs/react.development";

import { FILTER_ACTIONS } from "../constants";

const INITIAL_FILTERS = {
  urgencyFilter: {},
  categoryFilter: {},
  showInCompleted: false,
  searchValue: "",
};

export const useFilterState = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const onFilterAction = useCallback(
    ({ type, payload }) => {
      switch (type) {
        case FILTER_ACTIONS.UPDATE_URGENCY_FILTER:
          const updatedUrgencyFilter = {
            ...filters.urgencyFilter,
            [payload.type]: !filters.urgencyFilter[payload.type],
          };
          setFilters({ ...filters, urgencyFilter: updatedUrgencyFilter });
          break;

        case FILTER_ACTIONS.UPDATE_CATEGORY_FILTER:
          const updatedCategoryFilter = {
            ...filters.categoryFilter,
            [payload.type]: !filters.categoryFilter[payload.type],
          };
          setFilters({ ...filters, categoryFilter: updatedCategoryFilter });
          break;

        case FILTER_ACTIONS.TOGGLE_SHOW_INCOMPLETED:
          setFilters({ ...filters, showInCompleted: !filters.showInCompleted });
          break;

        case FILTER_ACTIONS.UPDATE_SEARCH_VALUE:
          setFilters({ ...filters, searchValue: payload.newSearchValue });
          break;

        default:
          break;
      }
    },
    [filters]
  );

  return { filters, onFilterAction };
};
