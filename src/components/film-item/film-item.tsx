import React from "react";

import "./_film-item.scss";
import { Link } from "react-router-dom";
import { Film } from "../../types";

interface FilmItemProps {
  filmData: Film;
}

const FilmItem: React.FC<FilmItemProps> = ({ filmData }) => {
  return (
    <div className="film-item">
      <div className="film-item__container">
        <Link to="/">
          <div className="film-item__poster">
            <img src={filmData.poster} className="film-item__image" alt="" />
            <div className="film-item__rating">{filmData.rating}</div>
          </div>
          <h4 className="film-item__title">{filmData.title}</h4>
          <div className="film-item__text">{filmData.description}</div>
        </Link>
      </div>
    </div>
  );
};

export default FilmItem;
