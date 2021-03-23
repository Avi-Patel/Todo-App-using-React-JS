import { urgencies, categories } from "./constants.js";
export const validateTodoForFilter = (todo, filterData) => {
  //collecting all consitions's true/false value
  const noUrgencyApplied = !(
    filterData.urgencyFilter[urgencies.LOW] ||
    filterData.urgencyFilter[urgencies.MEDIUM] ||
    filterData.urgencyFilter[urgencies.HIGH]
  );
  const noCategoryApplied = !(
    filterData.categoryFilter[categories.PERSONAL] ||
    filterData.categoryFilter[categories.ACADEMIC] ||
    filterData.categoryFilter[categories.SOCIAL]
  );

  const isChecked = filterData.isIncompleteEnabled;
  const isSatifiesSearchValue =
    filterData.searchValue === "" || todo.title.toLowerCase().indexOf(filterData.searchValue) + 1;

  return (
    (filterData.urgencyFilter[todo.urgency] || noUrgencyApplied) &&
    (filterData.categoryFilter[todo.category] || noCategoryApplied) &&
    ((isChecked && !todo.completed) || !isChecked) &&
    isSatifiesSearchValue
  );
};
