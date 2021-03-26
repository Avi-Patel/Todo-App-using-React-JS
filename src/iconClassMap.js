import { ACTIONS, BULK_ACTIONS, URGENCIES, CATEGORIES } from "./constants";

export const ICON_CLASS_MAP = {
  [BULK_ACTIONS.TOGGLE_COMPLETION]: "fa fa-check-square cblack",
  [BULK_ACTIONS.CLEAR_SELECTION]: "fa fa-square-o cblack",
  [BULK_ACTIONS.DELETE]: "fa fa-minus-square cblack",
  [URGENCIES.LOW]: "fa fa-exclamation-triangle cgreen",
  [URGENCIES.MEDIUM]: "fa fa-exclamation-triangle cyellow",
  [URGENCIES.HIGH]: "fa fa-exclamation-triangle cred",
  [CATEGORIES.PERSONAL]: "fa fa-user cwhite",
  [CATEGORIES.ACADEMIC]: "fa fa-book cwhite",
  [CATEGORIES.SOCIAL]: "fa fa-users cwhite",
  [ACTIONS.EDIT]: "fa fa-pencil cwhite",
  [ACTIONS.DELETE]: "fa fa-trash cwhite",
};
