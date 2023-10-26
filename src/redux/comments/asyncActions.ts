import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentData, SearchCommentsParams } from "../../types";
import axios from "axios";

export const fetchComments = createAsyncThunk<
  CommentData[],
  SearchCommentsParams
>("comment/fetchComments", async (params) => {
  const { filmId } = params;
  const apiPath = `http://localhost:3001/comments?filmId=${filmId}`;
  const { data } = await axios.get<CommentData[]>(apiPath);
  return data;
});
