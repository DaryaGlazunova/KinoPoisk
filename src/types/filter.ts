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
export type PopupClick = MouseEvent & {
  path: Node[];
};

export enum SortPropertyEnum {
  RATING = "rating",
  DATE = "durationDate",
}
