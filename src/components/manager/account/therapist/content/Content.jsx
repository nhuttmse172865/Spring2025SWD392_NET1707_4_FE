import React from "react";
import Table from "../table/Table";

const Content = ({setShowModal, setItemUpdate}) => {

  return (
    <div>
        <Table setShowModal={setShowModal} setItemUpdate={setItemUpdate} />
    </div>
  );
};

export default Content; 
