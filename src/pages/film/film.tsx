import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import StarRating from "../../components/star-rating/star-rating";
import { Film } from "../../types/film";
import FilmInfo from "../../components/film-info/film-info";

import "./_film.scss";
import Comments from "../../components/comments/comments-list";
import { fetchFilmInfoApi } from "../../api";

const FilmPage: React.FC = () => {
  const [filmInfo, setFilmInfo] = React.useState<Film>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchFilmInfo() {
      try {
        const data = await fetchFilmInfoApi(Number(id));
        setFilmInfo(data);
      } catch (error) {
        alert("Ошибка при получении данных фильма!");
        navigate("/");
      }
    }
    fetchFilmInfo();
  }, []);

  if (!filmInfo) {
    return <>Загрузка информации о фильме...</>;
  }

  return (
    <div className="film__container container">
      <FilmInfo {...filmInfo} />
      <div className="film__rating">
        <StarRating rating={filmInfo.rating} />
      </div>
      <Comments />
    </div>
  );
};

export default FilmPage;
