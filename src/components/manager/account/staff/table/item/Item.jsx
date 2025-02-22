import React from "react";
import ICONS from "../../../../../../constants/icons";
import CaculateGridColumn from "../../../../../../helpers/CaculateGridColumn";

const Item = ({ listTitle, active = false }) => {
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
      <li>1</li>
      <li>Name</li>
      <li>Category</li>
      <li>Description</li>
      <li>Issue Skin</li>
      <li>Skin Type</li>
      <li></li>
      <div
        className="absolute top-0 right-3.5"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img src={ICONS.update} alt="" />
      </div>
    </ul>
  );
};

export default Item;
