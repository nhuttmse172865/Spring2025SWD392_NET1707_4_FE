import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import axios from "axios";
import BASE from "../../../../../../constants/base";

const Body = ({ listTitle, setItemUpdate, setShowModal }) => {
  const [listServices, setListServices] = useState();

  const handleFetchServices = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
      );
      if (!response || response.status !== 200) throw new Error();
      setListServices(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (!listServices) {
      handleFetchServices();
    }
  }, []);

  return (
    <div
      className="bg-white rounded-[.375rem] mt-1 scroll-hidden overflow-x-hidden p-0.5 flex flex-col gap-2.5"
      style={{ height: "calc(100vh - 184px - 3.5rem" }}
    >
      {listServices &&
        listServices.map((item, index) => (
          <Item
            listTitle={listTitle}
            setShowModal={setShowModal}
            setItemUpdate={setItemUpdate}
            item={item}
            index={index}
          />
        ))}
    </div>
  );
};

export default Body;
