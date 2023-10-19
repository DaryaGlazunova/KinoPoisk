import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  DurationProperty,
  RatingProperty,
  SortPropertyEnum,
  SortProperty,
} from "../../types";

export interface IntefaceFilterState {
  searchValue: string;
  ratingOption: RatingProperty;
  durationOption: DurationProperty;
  sort: SortProperty;
  orderValue: string;
  currentPage: number;
}

const initialState: IntefaceFilterState = {
  searchValue: "",
  ratingOption: RatingProperty.ALL,
  durationOption: DurationProperty.ALL,
  sort: {
    name: "Рейтингу",
    sortProperty: SortPropertyEnum.RATING,
  },
  orderValue: "desc",
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setRating(state, action: PayloadAction<RatingProperty>) {
      state.ratingOption = action.payload;
    },
    setDuration(state, action: PayloadAction<DurationProperty>) {
      state.durationOption = action.payload;
    },
    setSort(state, action: PayloadAction<SortProperty>) {
      state.sort = action.payload;
    },
    setOrder(state, action: PayloadAction<string>) {
      state.orderValue = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IntefaceFilterState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.ratingOption = action.payload.ratingOption;
        state.durationOption = action.payload.durationOption;
      } else {
        state.searchValue = "";
        state.ratingOption = RatingProperty.ALL;
        state.durationOption = DurationProperty.ALL;
        state.sort = {
          name: "Рейтингу",
          sortProperty: SortPropertyEnum.RATING,
        };
        state.orderValue = "desc";
        state.currentPage = 1;
      }
    },
  },
});

export const {
  setDuration,
  setRating,
  setSort,
  setOrder,
  setSearchValue,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
