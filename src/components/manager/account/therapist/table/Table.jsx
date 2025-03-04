import React from "react";
import Header from "../../../../common/table/header/Header";
import Body from "./body/Body";

const Table = ({setShowModal, setItemUpdate, refreshData}) => {
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
      column: 2,
    },
    {
      name: "Phone",
      column: 2,
    },
    {
      name: "Experience",
      column: 2,
    },
    {
      name: "Gender",
      column: 1.5,
    },
    {
      name: "Status",
      column: 1,
    },
    {
      name: "",
      column: 0.5,
    },
  ];
  return (
    <div className="mt-5">
      <Header listTitle={listTitle} />
      <Body  listTitle={listTitle} setShowModal={setShowModal} setItemUpdate={setItemUpdate} refreshData={refreshData}/>
    </div>
  );
};

export default Table;
