import React, { useState } from "react";
import Card from "../card/Card";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../constants/localStorageName";

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Content = ({setItemUpdate, setShowModal}) => {
  const [categoryActive, setCategoryActive] = useLocalStorage(
    LOCALSTORAGE_NAME.CATEGORY_ITEMS_ACTIVE,
    ""
  );
  const [itemActive, setItemActive] = useState([]);
  const handleOnClick = (item) => {
    let list = [];
    if (itemActive.includes(item.id)) {
      list = itemActive.filter(
        (element) => Number(element) !== Number(item.id)
      );
    } else {
      list = [...itemActive, Number(item.id)];
    }
    setItemActive(list);
    setCategoryActive(list)
  };
  const handleOnUpdate = (event,item) => {
    event.stopPropagation();
    setItemUpdate(item)
    setShowModal(true)
  }
  return (
    <div
      className="mt-3 overflow-x-hidden overflow-y-scroll"
      style={{ height: "calc(100vh - 120px - 3.5rem" }}
    >
      <div className="flex flex-wrap gap-5 pt-2.5 pl-0.5">
        {list &&
          list.map((item, index) => (
            <Card
              key={index}
              item={item}
              active={itemActive.includes(Number(item.id))}
              handleOnClick={handleOnClick}
              handleOnUpdate={handleOnUpdate}
            />
          ))}
      </div>
    </div>
  );
};

export default Content;
