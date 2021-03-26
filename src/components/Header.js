import React, { useCallback } from "react";

import { TextInput } from "./utilityComponents/TextInput";
import { Button } from "./utilityComponents/Button";

import { FILTER_ACTIONS } from "../constants";

const AppTitleAndDate = React.memo(({ date }) => (
  <div className="header__left b8">
    <div className="header__left__name">Todo App</div>
    <div className="header__left__date">{date}</div>
  </div>
));

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

const Header = ({ date, searchValue, onFilterAction }) => (
  <div className="header b8 mar4">
    <AppTitleAndDate date={date} />
    <SearchBar searchValue={searchValue} onFilterAction={onFilterAction} />
  </div>
);

const _Header = React.memo(Header);
export { _Header as Header };
