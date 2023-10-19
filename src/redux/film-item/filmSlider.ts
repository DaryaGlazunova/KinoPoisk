import { createSlice } from "@reduxjs/toolkit";
import { Film, Status } from "../../types";
import { fetchFilms } from "./asyncActions";

export interface IntefaceFilmState {
  items: Film[];
  status: Status;
}

const initialState: IntefaceFilmState = {
  items: [],
  status: Status.LOADING,
};

export const FilmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchFilms.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchFilms.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchFilms.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = FilmSlice.actions;

export default FilmSlice.reducer;
