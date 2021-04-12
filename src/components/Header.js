import React, { useCallback } from "react";

import { TextInput } from "./utilityComponents/TextInput";
import { Button } from "./utilityComponents/Button";

import { FILTER_ACTIONS } from "../constants";

const HeaderTitleAndDate = React.memo(({ date }) => (
  <div className="header__left">
    <div className="header__left__name">Todo App</div>
    <div className="header__left__date">{date}</div>
  </div>
));
HeaderTitleAndDate.displayName = "TitleAndDate";

const SearchBar = React.memo(({ searchValue, onFilterAction }) => {
  const handleSearchChange = useCallback(
    (event) =>
      onFilterAction({
        type: FILTER_ACTIONS.UPDATE_SEARCH_VALUE,
        payload: { newSearchValue: event.target.value },
      }),
    [onFilterAction]
  );

  const handleClearSearch = useCallback(
    () =>
      onFilterAction({
        type: FILTER_ACTIONS.UPDATE_SEARCH_VALUE,
        payload: { newSearchValue: "" },
      }),
    [onFilterAction]
  );

  return (
    <div className="header__right">
      <TextInput
        name="search"
        value={searchValue}
        placeholder="search todos"
        onChange={handleSearchChange}
        extraClasses="header__right__search-input"
      />
      <Button label="Clear" onClick={handleClearSearch} />
    </div>
  );
});
SearchBar.displayName = "SearchBar";

const Header = React.memo(({ date, searchValue, onFilterAction }) => (
  <div className="header">
    <HeaderTitleAndDate date={date} />
    <SearchBar searchValue={searchValue} onFilterAction={onFilterAction} />
  </div>
));
Header.displayName = "Header";

export { Header };
