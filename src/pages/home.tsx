import React from "react";
import Pagination from "../components/pagination/pagination";
import Sort from "../components/sort/sort";
import Filter from "../components/filter/filter";
import FilmItem from "../components/film-item/film-item";
import AddFilm from "../components/add-film-button/add-film-button";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchFilms } from "../redux/film-item/asyncActions";
import {
  DurationProperty,
  RatingProperty,
  SearchFilmParams,
  SortPropertyEnum,
} from "../types";
import {
  setCurrentPage,
  setDuration,
  setFilters,
  setRating,
} from "../redux/filter/filterSlider";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import FilmItemSkeleton from "../components/film-item/skeleton";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const { items, status } = useSelector((state: RootState) => state.film);
  const { ratingOption, durationOption } = useSelector(
    (state: RootState) => state.filter
  );

  const { sort, orderValue } = useSelector((state: RootState) => state.filter);

  const getFilms = async () => {
    const order = orderValue;
    const sortBy = sort.sortProperty;
    const rating = ratingOption;
    const duration = durationOption;
    const currentPage = 1;

    dispatch(fetchFilms({ sortBy, order, rating, duration, currentPage }));

    window.scrollTo(0, 0);
  };

  //Если был первый рендер, то проверяем url параметры и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const searchParams = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchFilmParams;

      dispatch(
        setFilters({
          searchValue: "",
          ratingOption: searchParams.rating as RatingProperty,
          durationOption: searchParams.duration as DurationProperty,
          sort: {
            name: "Рейтингу",
            sortProperty: SortPropertyEnum.RATING,
          },
          orderValue: searchParams.order,
          currentPage: 1,
        })
      );

      isSearch.current = true;
    }
  }, []);

  //выполнение запроса для получение данных из бэка при изменении ондого из параметров массива
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (isSearch.current == false) {
      getFilms();
    }
    isSearch.current = false;
  }, [ratingOption, durationOption, sort.sortProperty, orderValue]);

  //Если самый первый рендер - не вставляем ничего в url.  На следующий рендер уже вставит параметры в url;
  React.useEffect(() => {
    if (isMounted.current == true) {
      const queryString = qs.stringify({
        ratingOption,
        durationOption,
        orderValue,
        sortProperty: sort.sortProperty,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [ratingOption, durationOption, sort.sortProperty, orderValue]);

  const onChangeRatingOption = (option: RatingProperty) => {
    dispatch(setRating(option));
    dispatch(setCurrentPage(1));
  };

  const onChangeDurationOption = (option: DurationProperty) => {
    dispatch(setDuration(option));
    dispatch(setCurrentPage(1));
  };

  const filmsItemsList = items.map((filmData) => {
    return <FilmItem key={filmData.id} filmData={filmData} />;
  });
  const skeleton = [...new Array(6)].map((_, index) => (
    <FilmItemSkeleton key={index} />
  ));

  return (
    <main>
      <div className="content container">
        <div className="content__column-1">
          <Filter
            selectedRating={ratingOption}
            selectedDuration={durationOption}
            onChangeRating={onChangeRatingOption}
            onChangeDuration={onChangeDurationOption}
          />
        </div>
        <div className="content__column-2">
          <div className="content__top">
            <div className="content__top-row">
              <h1>Список фильмов</h1>
              <AddFilm />
            </div>
            <div className="content__sort">
              <Sort value={sort} order={orderValue} />
            </div>
          </div>
          <div className="content__items">
            {status === "loading" ? skeleton : filmsItemsList}
          </div>
          <Pagination />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
