import { createSlice } from "@reduxjs/toolkit";
import { CommentData, Status } from "../../types";
import { fetchComments } from "./asyncActions";

export interface IntefaceCommentsState {
  comments: CommentData[];
  status: Status;
}

const initialState: IntefaceCommentsState = {
  comments: [],
  status: Status.LOADING,
};

export const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = Status.LOADING;
      state.comments = [];
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.status = Status.ERROR;
      state.comments = [];
    });
  },
});

export const { setComments } = CommentSlice.actions;

export default CommentSlice.reducer;
