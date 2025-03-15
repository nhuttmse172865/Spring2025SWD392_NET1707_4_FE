import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../../common/table/header/Header";
import Body from "./body/Body";
import Paging from "../../../../common/paging/Paging";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Table = ({ setShowModal, setItemUpdate, setShowModalUpdate, refreshData }) => {
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

  const [page, setPage] = useState(0);
  const [numberRows,setNumberRow] = useState();

  const handleFetchNumberRow = useCallback(async () => {
    try{
      const response = await axios.get(`${BASE.BASE_URL}/service/count`)
      if(!response || response.status !== 200) throw new Error()
      setNumberRow(Number(response.data.data))
    }catch(error){
      console.log(error)
    }
  },[])

  useEffect(() => {
    handleFetchNumberRow()
  },[handleFetchNumberRow])

  return (
    <div className="mt-5">
      <Header listTitle={listTitle} />
      <Body
        listTitle={listTitle}
        setItemUpdate={setItemUpdate}
        setShowModal={setShowModal}
        page={page}
        setShowModalUpdate={setShowModalUpdate}
        refreshData={refreshData}
      />
      <Paging page={page} setPage={setPage} numberPages={Math.ceil(numberRows/7)}/>
    </div>
  );
};

export default Table;
