import React from "react";
import ContentLoader from "react-content-loader";

const FilmItemSkeleton = () => (
  <ContentLoader
    speed={2}
    className="content__items"
    width="100%"
    height="100%"
    viewBox="0 0 235 350"
    backgroundColor="#f3f3f3"
    foregroundColor="#c2c2c2"
  >
    <rect
      className="film-item"
      x="0"
      y="0"
      rx="10"
      ry="10"
      width="100%"
      height="100%"
    />
  </ContentLoader>
);

export default FilmItemSkeleton;
