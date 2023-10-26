import React from "react";

import searchSvg from "../../assets/icons/header/search.svg";
import cleanSvg from "../../assets/icons/header/clear-search.svg";

import "./_search.scss";
import { debounce } from "ts-debounce";
import { useAppDispatch } from "../../redux/store";
import { setSearchValue } from "../../redux/filter/filterSlider";
import { useNavigate } from "react-router-dom";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState("");
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  const navigate = useNavigate();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (window.location.href.includes("/film/")) {
      navigate("/");
    }

    updateSearchValue(event.target.value);
    setValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="search">
      <img className="search__search-svg" src={searchSvg} alt="" />
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        className="search__input"
        placeholder="Поиск по названию фильма..."
        type="text"
      />
      <img
        onClick={onClickClear}
        className="search__clean-svg"
        src={cleanSvg}
        alt=""
      />
    </div>
  );
};

export default Search;
