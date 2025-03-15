import React, { useCallback, useEffect, useRef, useState } from "react";
import Item from "../item/Item";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Body = ({ listTitle, setTotalPages, page = 0 }) => {
  const [apppointments, setAppointments] = useState();
  const abortControllerRef = useRef(null);
  const handleFetchAppointments = useCallback(async () => {
    setAppointments();
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/appointments/getAll?page=${page}&size=7`,
        { signal }
      );
      if (!response || response.status !== 200) throw new Error();
      setAppointments(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    handleFetchAppointments();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [handleFetchAppointments]);

  return (
    <div
      className="bg-white rounded-[.375rem] mt-1 scroll-hidden overflow-x-hidden p-0.5 flex flex-col gap-2.5"
      style={{ height: "calc(100vh - 250px - 3.5rem" }}
    >
      {apppointments &&
        apppointments.map((item, index) => (
          <Item listTitle={listTitle} item={item} index={index} />
        ))}
    </div>
  );
};

export default Body;
