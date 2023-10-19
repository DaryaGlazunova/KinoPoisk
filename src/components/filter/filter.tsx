import React from "react";

import "./_filter.scss";
import { RatingProperty, DurationProperty } from "../../types";

type TypeFilterProps = {
  selectedRating: RatingProperty;
  selectedDuration: DurationProperty;
  onChangeRating: (idx: RatingProperty) => void;
  onChangeDuration: (idx: DurationProperty) => void;
};

const Filter: React.FC<TypeFilterProps> = ({
  selectedRating,
  selectedDuration,
  onChangeRating,
  onChangeDuration,
}) => {
  const RatingOptions = [
    { value: RatingProperty.ALL, text: "All" },
    { value: RatingProperty.HIGH, text: "7-10" },
    { value: RatingProperty.MIDDLE, text: "4-6" },
    { value: RatingProperty.LOW, text: "0-3" },
  ];

  const DurationOptions = [
    { value: DurationProperty.ALL, text: "All" },
    { value: DurationProperty.SHORT, text: "до 1 часа" },
    { value: DurationProperty.MEDIUM, text: "до 1.5 часов" },
    { value: DurationProperty.LONG, text: "от 1.5 часов" },
  ];

  return (
    <div className="filter">
      <label htmlFor="rating-filter">Рейтинг:</label>
      <select
        id="rating-filter"
        value={selectedRating}
        onChange={(event) =>
          onChangeRating(event.target.value as RatingProperty)
        }
      >
        {RatingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <label htmlFor="duration-filter">Длительность</label>
      <select
        id="duration--filter"
        value={selectedDuration}
        onChange={(event) =>
          onChangeDuration(event.target.value as DurationProperty)
        }
      >
        {DurationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
