import { useReducer } from "react";

import { FILTER_ACTIONS } from "../constants";

const initialfilterState = {
  urgencyFilter: {},
  categoryFilter: {},
  isIncompleteEnabled: false,
  searchValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case FILTER_ACTIONS.UPDATE_URGENCY_FILTER:
      const urgencyFilter = { ...state.urgencyFilter };
      urgencyFilter[action.payload.type] = !urgencyFilter[action.payload.type];
      return { ...state, urgencyFilter };

    case FILTER_ACTIONS.UPDATE_CATEGORY_FILTER:
      const categoryFilter = { ...state.categoryFilter };
      categoryFilter[action.payload.type] = !categoryFilter[action.payload.type];
      return { ...state, categoryFilter };

    case FILTER_ACTIONS.TOGGLE_INCOMPLETE_ENABLED:
      return { ...state, isIncompleteEnabled: !state.isIncompleteEnabled };

    case FILTER_ACTIONS.UPDATE_SEARCH_VALUE:
      return { ...state, searchValue: action.payload.newSearchValue };
    default:
      return state;
  }
};

export const useFilterState = () => {
  const [filterState, onFilterAction] = useReducer(reducer, initialfilterState);

  return [filterState, onFilterAction];
};
