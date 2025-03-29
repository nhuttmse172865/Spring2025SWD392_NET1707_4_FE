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
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1"> {item?.transactionCode}</li>
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1">
      {item?.customerEmail}
      </li>
      <li className="text-[rgba(21,19,19,0.5)] limited-lines-1">
      {item?.serviceName}
      </li>
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1">
      {formatDate(new Date(item?.payTime))}
      </li>
      <li className="text-[rgba(21,19,19,0.5)] limited-lines-1">
      {item?.amount/25000}
      </li>
      <li className="text-[rgba(0,0,0,0.5)] limited-lines-1">{item?.status}</li>
    </ul>
  );
};

export default Item;
