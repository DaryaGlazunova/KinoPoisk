import React from "react";

import "./_header.scss";
import { Link } from "react-router-dom";
import Search from "../search/search";
import Profile from "../../pages/profile";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <header className="header">
      <div className="header__container container">
        <Link to="">
          <div className="header__logo">
            <span>Kino</span>poisk
          </div>
        </Link>
        <Search />
        {isLoggedIn ? (
          <Profile />
        ) : (
          <Link to="login" className="header__login">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
