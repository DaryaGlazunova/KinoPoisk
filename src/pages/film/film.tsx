import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import StarRating from "../../components/star-rating/star-rating";
import axios from "axios";
import { Film } from "../../types";
import FilmInfo from "../../components/film-info/film-info";
import { getAverageRating } from "../../utils/getAverageRating";

import "./_film.scss";
import Comments from "../../components/comments/comments-list";

const FilmPage: React.FC = () => {
  const [filmInfo, setFilmInfo] = React.useState<Film>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchFilmInfo() {
      try {
        const { data } = await axios.get(`http://localhost:3001/films/${id}`);
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
        <StarRating rating={getAverageRating(filmInfo.rating)} />
      </div>
      {/* <div className="film__comments">
        <h3>Комментарии к фильму</h3>
        {commentsList ? (
          <CommentList comments={commentsList} />
        ) : (
          <div>Комментарии к фильму отсутвтуют</div>
        )}
      </div>
      <div className="film__add-comment">
        <AddComment />
      </div> */}
      <Comments />
    </div>
  );
};

export default FilmPage;
