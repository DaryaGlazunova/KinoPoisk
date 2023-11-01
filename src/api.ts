import axios from "axios";
import { Film } from "./types/film";
import { CommentData, fetchCommentType } from "./types/comment";

const serverPath = window.location.href.includes("localhost")
  ? "http://localhost:3001"
  : "https://kinopoisk-json-server.onrender.com";

export async function getCommentsApi(filmId: number): Promise<CommentData[]> {
  console.log(`${serverPath}/comments?filmId=${filmId}`);
  const { data } = await axios.get(`${serverPath}/comments?filmId=${filmId}`);
  console.log("getCommentsApi", data);
  return data;
}

export async function postCommentApi(
  newComment: fetchCommentType
): Promise<void> {
  const response = await axios.post(`${serverPath}/comments`, newComment);
  console.log("postCommentApi", response);
}

export async function putCommentApi(
  newParameters: fetchCommentType,
  commentId: number
): Promise<void> {
  const response = await axios.put(
    `${serverPath}/comments/${commentId}`,
    newParameters
  );
  console.log("putCommentApi", response);
}

export async function deleteCommentApi(commentId: number) {
  try {
    await axios.delete(`${serverPath}/comments/${commentId}`);
  } catch (error) {
    alert("Ошибка при удалении комментария!");
  }
}

export async function fetchFilmInfoApi(filmId: number): Promise<Film> {
  const { data } = await axios.get(`${serverPath}/films/${filmId}`);
  return data;
}
