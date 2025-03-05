import React from "react";
import CaculateGridColumn from "../../../../../../helpers/CaculateGridColumn";

const Item = ({ active = false, listTitle, item, index }) => {
  const gridColumnTemplate = CaculateGridColumn(listTitle);
  return (
    <ul
      className=" gap-[15px] text-[15px] text-[rgba(0,0,0,0.5)]  hover:bg-[rgba(0,0,0,0.05)]  grid justify-around items-center min-h-[80px] max-h-[100px] rounded-[.375rem] cursor-pointer relative"
      style={{
        gridTemplateColumns: gridColumnTemplate,
        padding: "10px 13px",
        boxShadow: active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
    >
      <li>{index + 1}</li>
      <li>{item.name}</li>
      <li>{item.email}</li>
      <li>{item.phone}</li>
      <li>{item.gender}</li>
      <li>{item.status}</li>
      <li></li>
    </ul>
  );
};

export default Item;
