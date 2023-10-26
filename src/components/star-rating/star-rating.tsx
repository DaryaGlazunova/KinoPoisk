import React from "react";
import { FaStar } from "react-icons/fa";
import "./_star-rating.scss";

interface StarRatingProps {
  rating?: number;
  numberOfStars?: number;
  starRatedColor?: string;
  starEmptyColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  numberOfStars = 10,
  starRatedColor = "#ffc107",
  starEmptyColor = "#e4e5e9",
}) => {
  const [selectedRatingValue, setRating] = React.useState<number>(rating);
  const [hover, setHover] = React.useState<number>(0);

  return (
    <div className="rating">
      <h3>Рейтинг фильма: {rating}</h3>
      {[...Array(numberOfStars)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} className="rating__label">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="rating__star"
              size={20}
              color={
                ratingValue <= (hover || selectedRatingValue)
                  ? starRatedColor
                  : starEmptyColor
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
      <div className="rating__user-rating-value">
        Ваша оценка: {hover || selectedRatingValue}
      </div>
    </div>
  );
};

export default StarRating;
