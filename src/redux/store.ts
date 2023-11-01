import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "./film-item/filmSlider";
import filterReducer from "./filter/filterSlider";
import userReducer from "./user/userSlider";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    film: filmReducer,
    filter: filterReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
