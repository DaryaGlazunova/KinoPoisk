import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DurationProperty,
  Film,
  RatingProperty,
  SearchFilmParams,
} from "../../types";
import axios from "axios";

type RatingMinMaxValue = {
  rating: RatingProperty;
  minValue: number;
  maxValue: number;
};

type DurationMinMaxValue = {
  duration: DurationProperty;
  minValue: number;
  maxValue: number;
};

const RatingFiltrParameters: RatingMinMaxValue[] = [
  {
    rating: RatingProperty.ALL,
    minValue: 0,
    maxValue: 10,
  },
  {
    rating: RatingProperty.HIGH,
    minValue: 7,
    maxValue: 10,
  },
  {
    rating: RatingProperty.MIDDLE,
    minValue: 4,
    maxValue: 6,
  },
  {
    rating: RatingProperty.LOW,
    minValue: 0,
    maxValue: 3,
  },
];

const DurationFiltrParameters: DurationMinMaxValue[] = [
  {
    duration: DurationProperty.ALL,
    minValue: 0,
    maxValue: 10,
  },
  {
    duration: DurationProperty.LONG,
    minValue: 2,
    maxValue: 10,
  },
  {
    duration: DurationProperty.MEDIUM,
    minValue: 1,
    maxValue: 2,
  },
  {
    duration: DurationProperty.SHORT,
    minValue: 0,
    maxValue: 0.9,
  },
];

const serverPath = window.location.href.includes("localhost")
  ? "http://localhost:3001"
  : "https://kinopoisk-json-server.onrender.com";

const filterDataByRating = (
  filmData: Film[],
  rating: RatingProperty
): Film[] => {
  const minMaxValuesObj = RatingFiltrParameters.find(
    (obj) => obj.rating === rating
  );
  if (!minMaxValuesObj) return filmData;

  return (filmData = filmData.filter((itemData) => {
    const filmRating = itemData.rating;
    return (
      minMaxValuesObj.minValue <= filmRating &&
      filmRating <= minMaxValuesObj.maxValue
    );
  }));
};

const filterDataByDuration = (
  data: Film[],
  duration: DurationProperty
): Film[] => {
  const minMaxValuesObj = DurationFiltrParameters.find(
    (obj) => obj.duration === duration
  );
  if (!minMaxValuesObj) return data;

  data = data = data.filter(
    (itemData) =>
      minMaxValuesObj.minValue <= Number(itemData.durationHours) &&
      Number(itemData.durationHours) <= minMaxValuesObj.maxValue
  );
  return data;
};

export const fetchFilms = createAsyncThunk<Film[], SearchFilmParams>(
  "film/fetchFilms",
  async (params) => {
    const { sortBy, order, rating, duration, currentPage, perPage } = params;
    console.log(sortBy, order, perPage, currentPage);
    const apiPath = `${serverPath}/films?_sort=${sortBy}&_order=${order}`;
    console.log("get films", apiPath);
    let { data } = await axios.get(apiPath);
    console.log("get films", data);
    data = filterDataByRating(data, rating);
    data = filterDataByDuration(data, duration);
    return data;
  }
);
