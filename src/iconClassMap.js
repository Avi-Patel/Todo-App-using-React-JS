import { ACTIONS, BULK_ACTIONS, URGENCIES, CATEGORIES } from "./constants";

export const ICON_CLASS_MAP = {
  [BULK_ACTIONS.TOGGLE_COMPLETION]: "fa fa-check-square",
  [BULK_ACTIONS.CLEAR_SELECTION]: "fa fa-square-o",
  [BULK_ACTIONS.DELETE]: "fa fa-minus-square",
  [URGENCIES.LOW]: "fa fa-exclamation-triangle cgreen",
  [URGENCIES.MEDIUM]: "fa fa-exclamation-triangle cyellow",
  [URGENCIES.HIGH]: "fa fa-exclamation-triangle cred",
  [CATEGORIES.PERSONAL]: "fa fa-user",
  [CATEGORIES.ACADEMIC]: "fa fa-book",
  [CATEGORIES.SOCIAL]: "fa fa-users",
  [ACTIONS.EDIT]: "fa fa-pencil",
  [ACTIONS.DELETE]: "fa fa-trash",
  [ACTIONS.ADD]: "fa fa-plus",
  CLOSE: "fa fa-times",
};
