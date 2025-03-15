import React, { useEffect, useState } from "react";
import Header from "../../../../../common/table/header/Header";
import Item from "./item/Item";
import axios from "axios";
import BASE from "../../../../../../constants/base";
import Popup from "../../../../../common/popup/Popup";
import ModalUpdateServiceDetail from "../serviceDetail/ModalUpdateServiceDetail";
import DEEP_COMPARE_OBJECTS from "../../../../../../helpers/DeepCompareObject";

const Table = ({
  serviceId,
  setServiceDetails,
  setServiceDetailsOrigin,
  serviceDetails,
}) => {
  const listTitle = [
    {
      name: "No.",
      column: 0.5,
    },
    {
      name: "Image",
      column: 1.5,
    },
    {
      name: "Name",
      column: 2.5,
    },
    {
      name: "Description",
      column: 3.5,
    },
    {
      name: "Day Order",
      column: 1.5,
    },
    {
      name: "Duration",
      column: 1,
    },
    {
      name: "Price",
      column: 1,
    },
    {
      name: "",
      column: 0.5,
    },
  ];
  const [refreshData, setRefreshData] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();

  const handleFetchServiceDetail = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/service-detail/getByServiceId?id=${serviceId}`
      );
      if (!response || response.status !== 200) throw new Error();
      setServiceDetails(response.data.data);
      setServiceDetailsOrigin(
        DEEP_COMPARE_OBJECTS.deepCloneArray(response.data.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (serviceId) {
      handleFetchServiceDetail();
    }
  }, [serviceId, refreshData]);

  return (
    <div className="mt-3">
      <Header listTitle={listTitle} backgroundColor={"#F7F7F7"} gapX={20} />
      {serviceDetails &&
        serviceDetails
          .sort((a, b) => a.day_order - b.day_order)
          .map((item, index) => (
            <Item
              listTitle={listTitle}
              index={index}
              item={item}
              setShowModalUpdate={setShowModalUpdate}
              setItemUpdate={setItemUpdate}
              setServiceDetails={setServiceDetails}
              serviceDetails={serviceDetails}
            />
          ))}
      {showModalUpdate && (
        <Popup>
          <ModalUpdateServiceDetail
            itemUpdate={itemUpdate}
            serviceId={serviceId}
            setShowModalUpdate={setShowModalUpdate}
            setRefreshData={setRefreshData}
          />
        </Popup>
      )}
    </div>
  );
};

export default Table;
