import React, { useCallback, useEffect, useRef, useState } from "react";
import Item from "../item/Item";
import axios from "axios";
import BASE from "../../../../../../constants/base";

const Body = ({ listTitle, setItemUpdate, setShowModal, page, setShowModalUpdate ,refreshData}) => {
  const [listServices, setListServices] = useState();
  const abortControllerRef = useRef(null);

  const handleFetchService = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    setListServices();
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/service/getAllServicePaging?page=${page}&size=7`,
        { signal }
      );
      if (!response || response.status !== 200) throw new Error();
      setListServices(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    handleFetchService();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [handleFetchService, refreshData]);

  return (
    <div
      className="bg-white rounded-[.375rem] mt-1 scroll-hidden overflow-x-hidden p-0.5 flex flex-col gap-2.5"
      style={{ height: "calc(100vh - 250px - 3.5rem" }}
    >
      {listServices &&
        listServices.map((item, index) => (
          <Item
            listTitle={listTitle}
            setShowModal={setShowModal}
            setItemUpdate={setItemUpdate}
            item={item}
            index={index}
            page={page}
            setShowModalUpdate={setShowModalUpdate}
          />
        ))}
    </div>
  );
};

export default Body;
