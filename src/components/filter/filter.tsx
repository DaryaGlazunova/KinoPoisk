import React from "react";
import filtrSvg from "../../assets/icons/filter.svg";
import closeSvg from "../../assets/icons//close.svg";

import "./_filter.scss";
import { RatingProperty, DurationProperty, PopupClick } from "../../types";

type TypeFilterProps = {
  selectedRating: RatingProperty;
  selectedDuration: DurationProperty;
  onChangeRating: (idx: RatingProperty) => void;
  onChangeDuration: (idx: DurationProperty) => void;
  dropdownVersionBreakpoint?: number;
};

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

const Filter: React.FC<TypeFilterProps> = ({
  selectedRating,
  selectedDuration,
  onChangeRating,
  onChangeDuration,
  dropdownVersionBreakpoint = 1000,
}) => {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const filtrRef = React.useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = React.useState(true);

  React.useEffect(() => {
    const handleResizeWindow = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      const eventPath = _event.composedPath
        ? _event.composedPath()
        : _event.path;

      if (filtrRef.current && !eventPath.includes(filtrRef.current)) {
        setIsHidden(true);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  if (screenWidth > dropdownVersionBreakpoint) {
    return (
      <div className="filter">
        <div className="filter__actions">
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
      </div>
    );
  } else {
    return (
      <div className="filter" ref={filtrRef}>
        <div
          className="filter__dropdown-button"
          onClick={() => setIsHidden(!isHidden)}
        >
          <img src={filtrSvg}></img>
          <span>Фильтры</span>
        </div>
        <div
          hidden={isHidden}
          className="filter__actions filter__actions_dropdown"
        >
          <img
            className="filter__close-actions-button"
            src={closeSvg}
            onClick={() => setIsHidden(true)}
            alt=""
          />
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
      </div>
    );
  }
};

export default Filter;
