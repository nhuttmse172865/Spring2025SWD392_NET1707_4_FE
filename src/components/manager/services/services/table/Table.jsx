import React from "react";
import Header from "../../../../common/table/header/Header";
import Body from "./body/Body";

const Table = ({ setShowModal, setItemUpdate }) => {
  const listTitle = [
    {
      name: "No.",
      column: 0.5,
    },
    {
      name: "Name",
      column: 1.5,
    },
    {
      name: "Category",
      column: 1.5,
    },
    {
      name: "Description",
      column: 2.5,
    },
    {
      name: "Issue Skin",
      column: 2,
    },
    {
      name: "Skin Type",
      column:2,
    },
    {
      name: "Therapist",
      column: 1.5,
    },
    {
      name: "",
      column: 0.5,
    },
  ];

  return (
    <div className="mt-5">
      <Header listTitle={listTitle} />
      <Body
        listTitle={listTitle}
        setItemUpdate={setItemUpdate}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Table;
