import React from "react";
import Pagination from "../../components/pagination/pagination";
import Sort, { sortList } from "../../components/sort/sort";
import Filter from "../../components/filter/filter";
import FilmItem from "../../components/film-item/film-item";
import AddFilm from "../../components/add-film-button/add-film-button";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchFilms } from "../../redux/film-item/asyncActions";
import {
  DurationProperty,
  RatingProperty,
  SearchFilmParams,
} from "../../types";
import {
  setCurrentPage,
  setDuration,
  setFilters,
  setRating,
} from "../../redux/filter/filterSlider";
import { useNavigate } from "react-router-dom";
import qs from "qs"; //парсинг параметров
import FilmItemSkeleton from "../../components/film-item/skeleton";

import "./_home.scss";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false); //фильтров в url нет, по умолчанию ничего нет
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const { items, status } = useSelector((state: RootState) => state.film);
  const { ratingOption, durationOption, currentPage, searchValue } =
    useSelector((state: RootState) => state.filter);

  const { sort, orderValue, perPage } = useSelector(
    (state: RootState) => state.filter
  );

  const getFilms = async () => {
    const order = orderValue;
    const sortBy = sort.sortProperty;
    const rating = ratingOption;
    const duration = durationOption;

    dispatch(
      fetchFilms({ sortBy, order, rating, duration, currentPage, perPage })
    );

    window.scrollTo(0, 0);
  };

  //парсим параметры фильтрации при первом рендере
  React.useEffect(() => {
    //проверяем есть ли параметры в url
    if (window.location.search) {
      const searchParams = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchFilmParams;

      const sort = sortList.find(
        (obj) => obj.sortProperty === searchParams.sortBy
      );
      //передача параметров из url в редакс
      dispatch(
        setFilters({
          searchValue: "",
          ratingOption: searchParams.rating as RatingProperty,
          durationOption: searchParams.duration as DurationProperty,
          orderValue: searchParams.order,
          currentPage: searchParams.currentPage,
          sort: sort || sortList[0],
          perPage,
        })
      );
      //был ли ранее произведен диспатч на изменение филтров (true - был)
      isSearch.current = true;
    }
  }, []);

  //выполнение запроса для получение данных из бэка при изменении ондого из параметров массива
  React.useEffect(() => {
    window.scrollTo(0, 0);
    //если isSearch = false значит можно делать запрос по умолчанию ( с параметрами из редакса) т.к. диспатчка на изменение фильтров не было
    //если isSerch = true значит не нужно делать запрос
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
  // isMounted - если приложение впервые отрендерилось не надо в URL что-то вшивать. Т.е. если первый рендер-ничего не меняй. Если же уже не первый рендер, то тогда выполняем действие
  React.useEffect(() => {
    if (isMounted.current) {
      //создаем объект который потом вошьем в браузерную строку
      const queryString = qs.stringify({
        ratingOption,
        durationOption,
        orderValue,
        sortProperty: sort.sortProperty,
        currentPage,
      });
      //передаем параметры в адресную строку
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

  //последний индекс
  const lastFilmIndex = currentPage * perPage;
  const firstFilmIndex = lastFilmIndex - perPage;
  const currentFilm = items.slice(firstFilmIndex, lastFilmIndex);

  const filmsItemsList = currentFilm
    .filter((filmData) => {
      return filmData.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((filmData) => {
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
            {!filmsItemsList.length ? (
              <div>Фильмы по вашему запросу не найдены :(</div>
            ) : status === "loading" ? (
              skeleton
            ) : (
              filmsItemsList
            )}
          </div>
          <Pagination
            perPage={perPage}
            totalFilms={items.length}
            currentPage={currentPage}
            onChangePage={onChangePage}
          />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
