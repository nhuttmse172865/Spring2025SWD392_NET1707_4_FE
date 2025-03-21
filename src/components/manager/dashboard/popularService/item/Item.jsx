import React from "react";
import CaculateGridColumn from "../../../../../helpers/CaculateGridColumn";
import DASHBOARD from "../../../../../constants/dashboard";

const Item = ({item, index}) => {
  const gridColumnTemplate = CaculateGridColumn(
    DASHBOARD.LIST_TITLE_POPULAR_SERVICES
  );
  return (
    <ul
      className="grid px-[15px] text-[14px] gap-x-5 h-[40px] items-center cursor-pointer hover:bg-[rgba(0,0,0,0.05)] rounded-[.375rem]"
      style={{
        gridTemplateColumns: gridColumnTemplate,
      }}
    >
      <li className="text-[rgba(0,0,0,0.5)]">{index + 1}</li>
      <li className="text-[rgba(0,0,0,0.5)]">{item?.name}</li>
      <li className="text-[rgba(21,19,19,0.5)]">{item?.numberUses}</li>
      <li className="text-[rgba(0,0,0,0.5)]">{item?.total}$</li>
    </ul>
  );
};

export default Item;
