import { DurationProperty, RatingProperty } from "./filter";

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
export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}
