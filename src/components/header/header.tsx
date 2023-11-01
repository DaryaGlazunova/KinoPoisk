import React from "react";

import "./_header.scss";
import { Link } from "react-router-dom";
import Search from "../search/search";
import LoginImage from "../../assets/icons/header/login.png";
import SignOut from "../../assets/icons/header/signout.png";
import ProfileImage from "../../assets/icons/header/profile-user-account.png";
import { useAuth } from "../../hooks/use-auth";

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
          <Link to="profile">
            <img className="header__profile" src={ProfileImage} alt="" />
          </Link>
        ) : (
          <Link to="login" className="header__login">
            {" "}
            Войти
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
