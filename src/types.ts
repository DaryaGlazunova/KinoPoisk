export type PopupClick = MouseEvent & {
  path: Node[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}

export enum SortPropertyEnum {
  RATING = "rating",
  DATE = "durationDate",
}

export enum DurationProperty {
  ALL = "",
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long",
}
export type SortProperty = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export enum RatingProperty {
  ALL = "all",
  HIGH = "high",
  MIDDLE = "middle",
  LOW = "low",
}

export type SearchFilmParams = {
  sortBy: string;
  order: string;
  rating: RatingProperty;
  duration: DurationProperty;
  currentPage: number;
  perPage: number;
};

export interface Film {
  id: number;
  poster: string;
  title: string;
  description: string;
  rating: number;
  publicationDate: string;
  durationHours: number;
}

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
