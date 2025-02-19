import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../constants/localStorageName";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Content = ({ setItemUpdate, setShowModal, refreshData }) => {
  const [categoryActive, setCategoryActive] = useLocalStorage(
    LOCALSTORAGE_NAME.CATEGORY_ITEMS_ACTIVE,
    ""
  );
  const [categories, setCategories] = useState();
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
    setCategoryActive(list);
  };
  const handleOnUpdate = (event, item) => {
    event.stopPropagation();
    setItemUpdate(item);
    setShowModal(true);
  };

  const handleLoadCategory = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/category/getAll`);
      if (!response || response.status !== 200) throw new Error();
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    handleLoadCategory();
  }, [refreshData]);

  return (
    <div
      className="mt-3 overflow-x-hidden overflow-y-scroll"
      style={{ height: "calc(100vh - 120px - 3.5rem" }}
    >
      <div className="flex flex-wrap gap-5 pt-2.5 pl-0.5">
        {categories &&
          categories.map((item, index) => (
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
