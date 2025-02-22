import React from "react";
import Header from "../../../../common/table/header/Header";
import Body from "./body/Body";

const Table = () => {
  const listTitle = [
    {
      name: "No.",
      column: 1,
    },
    {
      name: "Name",
      column: 2,
    },
    {
      name: "Email",
      column: 2.5,
    },
    {
      name: "Phone",
      column: 2.5,
    },
    {
      name: "Gender",
      column: 2,
    },
    {
      name: "Status",
      column: 1.5,
    },
    {
      name: "",
      column: 0.5,
    },
  ];
  return <div className="mt-5">
     <Header listTitle={listTitle} />
     <Body listTitle={listTitle} />
  </div>;
};

export default Table;
