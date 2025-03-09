import React from "react";
import CaculateGridColumn from "../../../../../../../helpers/CaculateGridColumn";

const Item = ({listTitle, active = false, item, index}) => {
  const gridColumnTemplate = CaculateGridColumn(listTitle);

  return (
    <ul
      className="gap-[15px] text-[15px] text-[rgba(0,0,0,0.5)]  hover:bg-[rgba(0,0,0,0.05)]  grid justify-around items-center min-h-[80px] max-h-[80px] rounded-[.375rem] cursor-pointer relative"
      style={{
        gridTemplateColumns: gridColumnTemplate,
        padding: "10px 13px",
        boxShadow: active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
    >
      <li>{index + 1}</li>
      <li>{item?.name}</li>
      <li>{item?.categoryName}</li>
      <li>{item?.description}</li>
      <li className="flex flex-wrap gap-5"></li>
      <li className="flex flex-wrap gap-5"></li>
      <li></li>
      <div
        className="absolute top-0 right-3.5"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
    </ul>
  );
};

export default Item;
