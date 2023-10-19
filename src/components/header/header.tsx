import React from "react";

import "./_header.scss";
import { Link } from "react-router-dom";
import Search from "../search/search";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <Link to="">
          <div className="header__logo">
            <span>Kino</span>poisk
          </div>
        </Link>
        <Search />
      </div>
    </header>
  );
};

export default Header;
