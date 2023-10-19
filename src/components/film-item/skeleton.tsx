import React from "react";
import ContentLoader from "react-content-loader";

const FilmItemSkeleton = () => (
  <ContentLoader
    speed={2}
    className="film-item"
    width={260}
    height={427}
    viewBox="0 0 261 427"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="27" y="5" rx="12" ry="12" width="217" height="296" />
    <rect x="29" y="318" rx="8" ry="8" width="174" height="22" />
    <rect x="31" y="353" rx="13" ry="13" width="213" height="77" />
  </ContentLoader>
);

export default FilmItemSkeleton;
