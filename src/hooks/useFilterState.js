import { useReducer } from "react";

import { FILTER_ACTIONS } from "../constants";

const INITIAL_FILTER_STATE = {
  urgencyFilter: {},
  categoryFilter: {},
  //
  isIncompleteEnabled: false,
  searchValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.UPDATE_URGENCY_FILTER:
      const updatedUrgencyFilter = {
        ...state.urgencyFilter,
        [action.payload.type]: !state.urgencyFilter[action.payload.type],
      };
      return { ...state, urgencyFilter: updatedUrgencyFilter };

    case FILTER_ACTIONS.UPDATE_CATEGORY_FILTER:
      const updatedCategoryFilter = {
        ...state.categoryFilter,
        [action.payload.type]: !state.categoryFilter[action.payload.type],
      };
      return { ...state, categoryFilter: updatedCategoryFilter };

    case FILTER_ACTIONS.TOGGLE_INCOMPLETE_ENABLED:
      return { ...state, isIncompleteEnabled: !state.isIncompleteEnabled };

    case FILTER_ACTIONS.UPDATE_SEARCH_VALUE:
      return { ...state, searchValue: action.payload.newSearchValue };
    default:
      return state;
  }
};

export const useFilterState = () => {
  const [filterState, onFilterAction] = useReducer(reducer, INITIAL_FILTER_STATE);

  return { filterState, onFilterAction };
};
