import { useReducer } from "react";
import { filterPanelActions } from "../constants";

const initialfilterState = {
  urgencyFilter: {},
  categoryFilter: {},
  isIncompleteEnabled: false,
  searchValue: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case filterPanelActions.UPDATE_URGENCY_FILTER:
      const urgencyFilter = { ...state.urgencyFilter };
      urgencyFilter[action.payload.type] = !urgencyFilter[action.payload.type];
      return { ...state, urgencyFilter };

    case filterPanelActions.UPDATE_CATEGORY_FILTER:
      const categoryFilter = { ...state.categoryFilter };
      categoryFilter[action.payload.type] = !categoryFilter[action.payload.type];
      return { ...state, categoryFilter };

    case filterPanelActions.TOGGLE_INCOMPLETE_ENABLED:
      return { ...state, isIncompleteEnabled: !state.isIncompleteEnabled };

    case filterPanelActions.UPDATE_SEARCH_VALUE:
      return { ...state, searchValue: action.payload.newSearchValue };
    default:
      return state;
  }
};

export const useFilterState = () => {
  const [filterState, dispatch] = useReducer(reducer, initialfilterState);

  return [filterState, dispatch];
};
