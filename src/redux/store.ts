import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./film-item/filmSlider";
import filterReducer from "./filter/filterSlider";
import commentsReducer from "./comments/commentsSlider";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    film: filmReducer,
    filter: filterReducer,
    comments: commentsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
