import React from "react";
import orderImage from "../../assets/icons/sort/sort.svg";

import "./_sort.scss";
import { SortProperty, SortPropertyEnum, PopupClick } from "../../types";
import { useDispatch } from "react-redux";
import { setOrder, setSort } from "../../redux/filter/filterSlider";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const sortList: SortItem[] = [
  { name: "Рейтингу", sortProperty: SortPropertyEnum.RATING },
  { name: "Дате публикации", sortProperty: SortPropertyEnum.DATE },
];

const orderList = ["desc", "asc"];

interface SortProps {
  value: SortProperty;
  order: string;
}

const Sort: React.FC<SortProps> = ({ value, order }) => {
  const [hiddenPopap, setHiddenPopap] = React.useState(true);
  const sortRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      const eventPath = _event.composedPath
        ? _event.composedPath()
        : _event.path;

      if (sortRef.current && !eventPath.includes(sortRef.current)) {
        setHiddenPopap(true);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  const onClickSortItem = (obj: SortItem) => {
    setHiddenPopap(true);
    dispatch(setSort(obj));
  };

  const onCliclOrderImage = () => {
    if (order === orderList[0]) {
      dispatch(setOrder(orderList[1]));
    } else {
      dispatch(setOrder(orderList[0]));
    }
  };

  return (
    <div ref={sortRef} className="sort">
      <b>Сортировать по:</b>
      <span onClick={() => setHiddenPopap(!hiddenPopap)}>{value.name}</span>
      <img
        className="sort__order"
        src={orderImage}
        alt=""
        onClick={() => onCliclOrderImage()}
      />
      <div className="sort__popup" hidden={hiddenPopap}>
        <ul>
          {sortList.map((sortItem, index) => (
            <li
              key={index}
              className={
                value.sortProperty == sortItem.sortProperty ? "active" : ""
              }
              onClick={() => onClickSortItem(sortItem)}
            >
              {sortItem.name}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sort;
