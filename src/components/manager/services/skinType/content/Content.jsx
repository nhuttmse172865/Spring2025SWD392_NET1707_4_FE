import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../constants/localStorageName";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Content = ({
  setItemUpdate,
  setShowModal,
  refreshData,
  setRefreshData,
}) => {
  const [skinTypeItemsActive, setSkinTypeItemsActive] = useLocalStorage(
    LOCALSTORAGE_NAME.SKIN_TYPE_ITEMS_ACTIVE,
    ""
  );
  const [itemActive, setItemActive] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
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
    setSkinTypeItemsActive(list);
  };
  const handleOnUpdate = (event, item) => {
    event.stopPropagation();
    setItemUpdate(item);
    setShowModal(true);
  };

  const handleGetAllSkinType = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/skinType/getAlSkinTypeIsNotDeleted`
      );
      if (!response || response.status !== 200 ) throw new Error();
      setSkinTypes(response.data.data);
    } catch (error) {
    } finally {
      
    }
  };

  useEffect(() => {
    handleGetAllSkinType()
  },[refreshData])
  return (
    <div
      className="mt-3 overflow-x-hidden overflow-y-scroll"
      style={{ height: "calc(100vh - 120px - 3.5rem" }}
    >
      <div className="flex flex-wrap gap-5 pt-2.5 pl-0.5">
        {skinTypes &&
          skinTypes.map((item, index) => (
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
