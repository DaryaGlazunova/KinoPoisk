import axios from "axios";
import { CommentData } from "./types";

export async function getComments(id: number): Promise<CommentData[]> {
  const { data } = await axios.get(
    `http://localhost:3001/comments?filmId=${id}`
  );
  return data;
}

export async function postComment(newComment: object) {
  const resp = await axios.post(`http://localhost:3001/comments`, newComment);
  console.log(resp);
}
