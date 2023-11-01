export type CommentData = {
  id: number;
  filmId: number;
  userId: number;
  authorName: string;
  authorImage: string;
  text: string;
  date: string;
};
export type fetchCommentType = {
  filmId: number;
  userId: number;
  authorName: string;
  authorImage: string;
  text: string;
  date: string;
};
export type SearchCommentsParams = {
  filmId: number;
};

export enum SubmitLabels {
  SEND = "Отправить",
  EDIT = "Обновить",
  CANCEL = "Отменить",
}
