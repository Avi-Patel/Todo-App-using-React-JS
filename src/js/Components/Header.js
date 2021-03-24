import React, { useCallback } from "react";

import TextInput from "./TextInput";

import { FILTER_ACTIONS } from "../constants";

const AppTitleAndDate = React.memo(({ date }) => {
  return (
    <div className="header__left b8">
      <div className="header__left__name">Todo App</div>
      <div className="header__left__date">{date}</div>
    </div>
  );
});

const SearchBar = React.memo(({ searchValue, onFilterAction }) => {
  // Doubt : Search will re-render when searchValue changes. Should i use useCallback only to not create function again?
  const handleSearchChange = useCallback(
    (event) => {
      onFilterAction({
        type: FILTER_ACTIONS.UPDATE_SEARCH_VALUE,
        payload: { newSearchValue: event.target.value },
      });
    },
    [onFilterAction]
  );

  const handleClearSearch = useCallback(() => {
    onFilterAction({
      type: FILTER_ACTIONS.UPDATE_SEARCH_VALUE,
      payload: { newSearchValue: "" },
    });
  }, [onFilterAction]);

  return (
    <div className="header__right">
      <TextInput
        name="search"
        value={searchValue}
        placeholder="search todos"
        handleChange={handleSearchChange}
        extraClasses="header__right__search-input"
      />
      <button className="green-btn mar8" onClick={handleClearSearch}>
        Clear
      </button>
    </div>
  );
});

const Header = React.memo(({ date, searchValue, onFilterAction }) => {
  return (
    <div className="header b8 mar4">
      <AppTitleAndDate date={date} />
      <SearchBar searchValue={searchValue} onFilterAction={onFilterAction} />
    </div>
  );
});

export default Header;
