export const ACTIONS = {
  INIT: "INIT",
  EDIT: "EDIT",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  SELECT: "SELECT",
  TOGGLE_FROM_SELECTED: "TOGGLE_FROM_SELECTED",
  TOGGLE_COMPLETION: "TOGGLE_COMPLETION",
  ALTER_COMPLETION_IN_BULK: "ALTER_COMPLETION_IN_BULK",
  DELETE_IN_BULK: "DELETE_IN_BULK",
  RESET: "RESET",
  RESET_SELECTED_IDS: "RESET_SELECTED_IDS",
};

export const BULK_ACTIONS = {
  TOGGLE_COMPLETION: "Toggle completion",
  CLEAR_SELECTION: "Clear selection",
  DELETE: "Delete",
};

export const MODAL_WINDOW_ACTIONS = {
  SHOW: "SHOW",
  CLOSE: "CLOSE",
  UPDATE_DATA: "UPDATE_DATA",
};

export const HISTORY_ACTIONS = {
  ADD_ACTIONS: "ADD_ACTION",
  UNDO_SUCCESS: "UNDO_SUCCESS",
  REDO_SUCCESS: "REDO_SUCCESS",
};

//
export const CATEGORIES = {
  PERSONAL: "personal",
  ACADEMIC: "academic",
  SOCIAL: "social",
};
export const URGENCIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const TODO_FORM_INPUTS = {
  TITLE: "Title",
  URGENCY: "Urgency",
  CATEGORY: "Category",
};

export const FILTER_ACTIONS = {
  UPDATE_URGENCY_FILTER: "UPDATE_URGENCY_FILTER",
  UPDATE_CATEGORY_FILTER: "UPDATE_CATEGORY_FILTER",
  TOGGLE_SHOW_INCOMPLETED: "TOGGLE_SHOW_INCOMPLETED",
  UPDATE_SEARCH_VALUE: "UPDATE_SEARCH_VALUE",
};

export const INVALID_POSITION = -1;