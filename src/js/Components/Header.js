import React from "react";
import { filterPanelActions } from "../constants";
import { TextInput } from "./TextInput";

const AppTitleAndDate = () => {
  // Date will not get updated if Header does not re-render bcz of no prop changes.
  return (
    <div className="header__left b8">
      <div className="header__left__name">Todo App</div>
      <div className="header__left__date">{new Date().toDateString()}</div>
    </div>
  );
};

const SearchBar = React.memo(({ searchValue, dispatch }) => {
  const handleSearchChange = (event) => {
    dispatch({
      type: filterPanelActions.UPDATE_SEARCH_VALUE,
      payload: { newSearchValue: event.target.value },
    });
  };

  const handleClearSearch = () => {
    dispatch({ type: filterPanelActions.UPDATE_SEARCH_VALUE, payload: { newSearchValue: "" } });
  };

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

export const Header = React.memo(({ searchValue, dispatch }) => {
  return (
    <div className="header b8 mar4">
      <AppTitleAndDate />
      <SearchBar searchValue={searchValue} dispatch={dispatch} />
    </div>
  );
});
