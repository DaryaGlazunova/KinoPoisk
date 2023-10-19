import React from "react";
import Pagination from "../components/pagination/pagination";
import Sort, { sortList } from "../components/sort/sort";
import Filter from "../components/filter/filter";
import FilmItem from "../components/film-item/film-item";
import AddFilm from "../components/add-film-button/add-film-button";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchFilms } from "../redux/film-item/asyncActions";
import { DurationProperty, RatingProperty, SearchFilmParams } from "../types";
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
  const { ratingOption, durationOption, currentPage } = useSelector(
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

  //парсим параметры фильтрации при первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      const searchParams = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchFilmParams;

      const sort = sortList.find(
        (obj) => obj.sortProperty === searchParams.sortBy
      );

      dispatch(
        setFilters({
          searchValue: "",
          ratingOption: searchParams.rating as RatingProperty,
          durationOption: searchParams.duration as DurationProperty,
          orderValue: searchParams.order,
          currentPage: searchParams.currentPage,
          sort: sort || sortList[0],
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
  }, [
    ratingOption,
    durationOption,
    sort.sortProperty,
    orderValue,
    currentPage,
  ]);

  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        ratingOption,
        durationOption,
        orderValue,
        sortProperty: sort.sortProperty,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [
    ratingOption,
    durationOption,
    sort.sortProperty,
    orderValue,
    currentPage,
  ]);

  const onChangeRatingOption = (option: RatingProperty) => {
    dispatch(setRating(option));
    dispatch(setCurrentPage(1));
  };

  const onChangeDurationOption = (option: DurationProperty) => {
    dispatch(setDuration(option));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  console.log(onChangePage);

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
