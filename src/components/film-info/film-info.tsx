import React from "react";

import "./_film-info.scss";
import { Film } from "../../types/film";

const FilmInfo: React.FC<Film> = ({
  poster,
  title,
  description,
  publicationDate,
  durationHours,
}) => {
  return (
    <div className="film__info">
      <img className="film__poster" src={poster} alt="" />
      <div className="film__about">
        <h2 className="film__title">{title}</h2>
        <div className="film__description">
          <h4>О фильме</h4>
          <span>{description}</span>
        </div>
        <div className="film__parameters">
          <div className="film__duration">
            Продолжительность: <span>{durationHours} час/а.</span>
          </div>
          <div className="film__publicationDate">
            Дата публикации: <span>{publicationDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
