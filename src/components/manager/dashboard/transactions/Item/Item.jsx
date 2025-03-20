import React from "react";
import CaculateGridColumn from "../../../../../helpers/CaculateGridColumn";
import DASHBOARD from "../../../../../constants/dashboard";
import formatDate from "../../../../../helpers/FormatDate";

const Item = ({ item, index }) => {
  const gridColumnTemplate = CaculateGridColumn(
    DASHBOARD.LIST_TITLE_TRANSACTIONS
  );
  return (
    <ul
      className="grid px-[15px] text-[14px] gap-x-5 h-[40px] items-center cursor-pointer hover:bg-[rgba(0,0,0,0.05)] rounded-[.375rem]"
      style={{
        gridTemplateColumns: gridColumnTemplate,
      }}
    >
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1">{index + 1}</li>
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1">
        {item?.account?.email}
      </li>
      <li className="text-[rgba(21,19,19,0.5)] limited-lines-1">
        {item?.service?.name}
      </li>
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1">
        {formatDate(new Date(item?.createdTime))}
      </li>
      <li className="text-[rgba(21,19,19,0.5)] limited-lines-1">
        {item?.paid}
      </li>
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1">{item?.status}</li>
    </ul>
  );
};

export default Item;
