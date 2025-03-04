import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import axios from "axios";
import BASE from "../../../../../../constants/base";

const Body = ({ listTitle, setShowModal, setItemUpdate, refreshData }) => {
  const [therapists, setTherapists] = useState();

  const handleLoadTherapist = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/get-all-therapists?page=0&size=10`
      );
      if (response || response.status === 200) {
        setTherapists(response.data.data.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    handleLoadTherapist();
  }, [refreshData]);

  useEffect(() => {
    if (!therapists) {
      handleLoadTherapist();
    }
  }, []);

  return (
    <div
      className="bg-white rounded-[.375rem] mt-1 scroll-hidden overflow-x-hidden p-0.5 flex flex-col gap-2.5"
      style={{ height: "calc(100vh - 184px - 3.5rem" }}
    >
      {therapists &&
        therapists.map((item, index) => (
          <Item
            item={item}
            listTitle={listTitle}
            index={index}
            setShowModal={setShowModal}
            setItemUpdate={setItemUpdate}
          />
        ))}
    </div>
  );
};

export default Body;
