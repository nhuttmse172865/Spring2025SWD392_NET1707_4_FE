import React from "react";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";

const Table = () => {
  const listTitle = [
    {
      name: "No.",
      column: 1,
    },
    {
      name: "Customer",
      column: 2,
    },
    {
      name: "Service",
      column: 2.5,
    },
    {
      name: "Therapist",
      column: 2,
    },
    {
      name: "Date",
      column: 2,
    },
    {
      name: "Price",
      column: 2,
    },
    {
      name: "Status",
      column: 1.5,
    },
  ];
  return (
    <div className="mt-5">
      <Header listTitle={listTitle} />
      <Body listTitle={listTitle} />
    </div>
  );
};

export default Table;
