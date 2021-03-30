import { URGENCIES, CATEGORIES } from "./constants.js";

export const validateTodoForFilter = (todo, filterData) => {
  //collecting all consitions's true/false value
  const noUrgencyApplied = !(
    filterData.urgencyFilter[URGENCIES.LOW] ||
    filterData.urgencyFilter[URGENCIES.MEDIUM] ||
    filterData.urgencyFilter[URGENCIES.HIGH]
  );
  const noCategoryApplied = !(
    filterData.categoryFilter[CATEGORIES.PERSONAL] ||
    filterData.categoryFilter[CATEGORIES.ACADEMIC] ||
    filterData.categoryFilter[CATEGORIES.SOCIAL]
  );

  const isChecked = filterData.showInCompleted;
  const isSatifiesSearchValue =
    filterData.searchValue === "" || todo.title.toLowerCase().indexOf(filterData.searchValue) + 1;

  return (
    (filterData.urgencyFilter[todo.urgency] || noUrgencyApplied) &&
    (filterData.categoryFilter[todo.category] || noCategoryApplied) &&
    ((isChecked && !todo.completed) || !isChecked) &&
    isSatifiesSearchValue
  );
};
