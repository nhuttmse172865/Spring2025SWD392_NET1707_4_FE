import React, { useState } from "react";
import Header from "../../../common/table/header/Header";
import Body from "./body/Body";
import Paging from "../../../common/paging/Paging";

const Table = () => {
  const listTitle = [
    {
      name: "No.",
      column: 1,
    },
    {
      name: "Customer",
      column: 2.5,
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
      column: 1.5,
    },
    {
      name: "Price",
      column: 1.5,
    },
    {
      name: "Status",
      column: 1,
    },
  ];

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  return (
    <div className="mt-5">
      <Header listTitle={listTitle} />
      <Body listTitle={listTitle} setTotalPages={setTotalPages} page={page} />
      <Paging
        page={page}
        setPage={setPage}
        numberPages={totalPages}
      />
    </div>
  );
};

export default Table;
