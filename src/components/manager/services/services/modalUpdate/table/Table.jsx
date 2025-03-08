import React from "react";
import Header from "../../../../../common/table/header/Header";
import Item from "./item/Item";

const Table = () => {
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
      name: "Duration",
      column: 2,
    },
    {
      name: "Price",
      column: 1.5,
    },
    {
      name: "",
      column: 0.5,
    },
  ];

  return (
    <div className="mt-3">
      <Header listTitle={listTitle} backgroundColor={"#F7F7F7"}/>
      <Item listTitle={listTitle} index={1}/>
      <Item listTitle={listTitle} index={1}/>
      <Item listTitle={listTitle} index={1}/>
      <Item listTitle={listTitle} index={1}/>
    </div>
  );
};

export default Table;
