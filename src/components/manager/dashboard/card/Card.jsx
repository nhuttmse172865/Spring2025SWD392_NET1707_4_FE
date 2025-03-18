import React from "react";
import ICONS from "../../../../constants/icons";

const Card = ({item}) => {
  return <div className="rounded-[.375rem] bg-white p-4 relative overflow-hidden">
    <h6 className="text-[14px] text-[rgba(0,0,0,0.5)]">{item.title}</h6>
    <p className="mt-2.5 text-[24px] font-medium text-[rgba(0,0,0,0.7)]">5</p>
    <span className="text-[13px] text-[rgba(0,0,0,0.5)]"><span className="text-green-500">+10% </span> vs last month</span>
    <div className="absolute right-4 top-4">
        <img src={ICONS.employeeActive} />
    </div>
  </div>;
};

export default Card;
