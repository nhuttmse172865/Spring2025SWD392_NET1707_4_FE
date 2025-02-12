import React from "react";
import ICONS from "../../../constants/icons";

const Filter = () => {
  return (
    <div className="h-[40px] max-w-[100px] flex justify-center items-center gap-2.5 cursor-pointer">
      <span className="text-[14px] text-[rgba(0,0,0,0.5)]">Filter</span>
      <img src={ICONS.filter} />
    </div>
  );
};

export default Filter;
