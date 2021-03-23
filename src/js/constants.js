export const ACTIONS = {
  //
  TOGGLE_FROM_SELECTED: "TOGGLE_FROM_SELECTED",
  EDIT: "EDIT",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  SELECT: "SELECT",
  MARK_COMPLETED: "MARK_COMPLETED",
  ALTER_COMPLETION_IN_BULK: "ALTER_COMPLETION_IN_BULK",
  DELETE_IN_BULK: "DELETE_IN_BULK",
  RESET: "RESET",
};

export const BULK_ACTIONS = {
  TOGGLE_COMPLETION: "Toggle completion",
  CLEAR_SELECTION: "Clear selection",
  DELETE: "Delete",
};

export const categories = {
  PERSONAL: "personal",
  ACADEMIC: "academic",
  SOCIAL: "social",
};
export const urgencies = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};
export const categoryIconClass = {
  USERALT: "fa-user",
  BOOKOPEN: "fa-book",
  USERS: "fa-users",
};

export const color = {
  GREEN: "cgreen",
  YELLOW: "cyellow",
  RED: "cred",
};

export const urgencyToColorMap = {
  [urgencies.LOW]: color.GREEN,
  [urgencies.MEDIUM]: color.YELLOW,
  [urgencies.HIGH]: color.RED,
};
export const categoryToIconClassMap = {
  [categories.PERSONAL]: categoryIconClass.USERALT,
  [categories.ACADEMIC]: categoryIconClass.BOOKOPEN,
  [categories.SOCIAL]: categoryIconClass.USERS,
};

export const todoFormInputs = {
  TITLE: "TITLE",
  URGENCY: "URGENCY",
  CATEGORY: "CATEGORY",
};

export const filterPanelActions = {
  UPDATE_URGENCY_FILTER: "UPDATE_URGENCY_FILTER",
  UPDATE_CATEGORY_FILTER: "UPDATE_CATEGORY_FILTER",
  TOGGLE_INCOMPLETE_ENABLED: "TOGGLE_INCOMPLETE_ENABLED",
  UPDATE_SEARCH_VALUE: "UPDATE_SEARCH_VALUE",
};

export const filterNames = {
  URGENCY: "urgency",
  CATEGORY: "category",
};

export const INVALID_POSITION = -1;

export const urgencyOptions = [urgencies.LOW, urgencies.MEDIUM, urgencies.HIGH];
export const categoryOptions = [categories.PERSONAL, categories.ACADEMIC, categories.SOCIAL];
