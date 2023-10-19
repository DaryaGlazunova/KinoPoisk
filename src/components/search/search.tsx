import React from "react";

import searchSvg from "../../assets/icons/header/search.svg";
import cleanSvg from "../../assets/icons/header/clear-search.svg";

import "./_search.scss";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  return (
    <div className="search">
      <img className="search__search-svg" src={searchSvg} alt="" />
      <input
        className="search__input"
        placeholder="Поиск по названию фильма..."
        type="text"
      />
      <img className="search__clean-svg" src={cleanSvg} alt="" />
    </div>
  );
};

export default Search;
