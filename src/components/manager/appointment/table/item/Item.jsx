import React from "react";
import CaculateGridColumn from "../../../../../helpers/CaculateGridColumn";

const Item = ({ active = false, listTitle, item, index }) => {
  const gridColumnTemplate = CaculateGridColumn(listTitle);
  return (
    <ul
      className=" gap-[15px] text-[15px] text-[rgba(0,0,0,0.5)]  hover:bg-[rgba(0,0,0,0.05)]  grid justify-around items-center min-h-[77px] max-h-[77px] rounded-[.375rem] cursor-pointer relative"
      style={{
        gridTemplateColumns: gridColumnTemplate,
        padding: "10px 13px",
        boxShadow: active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
    >
      <li>{index + 1}</li>
      <li>{item?.account.email}</li>
      <li>{item?.service.name}</li>
      <li>{item?.appointment_details[0]?.therapist?.account?.name}</li>
      <li>{"2025-03-09"}</li>
      <li>{item?.total}</li>
      <li>{item?.status}</li>
    </ul>
  );
};

export default Item;
