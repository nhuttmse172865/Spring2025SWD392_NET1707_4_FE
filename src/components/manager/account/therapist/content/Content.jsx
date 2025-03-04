import React from "react";
import Table from "../table/Table";

const Content = ({setShowModal, setItemUpdate, refreshData}) => {

  return (
    <div>
        <Table setShowModal={setShowModal} setItemUpdate={setItemUpdate} refreshData={refreshData} />
    </div>
  );
};

export default Content; 
