import React, { useState } from "react";
import LIST_MENU_DROP_DOWN_HEADER from "../../../../constants/menuDropDown";
import ROLES from "../../../../constants/role";

const DropDown = ({ active = true }) => {
  const listMenu = LIST_MENU_DROP_DOWN_HEADER.filter((item) =>
    item.roles.includes(ROLES.CUSTOMER)
  );
  const height = listMenu.length*40 + 20;
  return (
    <ul
      className="absolute top-full mt-2 z-[10000] w-max right-0 bg-white rounded-[.375rem] ease-in duration-300 p-2.5"
      style={{
        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.05)",
        height: active ? `${height}px` : 0,
        opacity: active ? 1 : 0,
      }}
    >
      {listMenu.map((item, index) => (
        <li
          className="flex gap-4 w-full h-[30px] items-center px-2.5 py-5 hover:bg-gray-100 rounded-[.375rem]"
          style={{ opacity: active ? 1 : 0 }}
        >
          <img src={item.icon} alt="" className="w-[19px] h-[19px]" />
          <span className="text-[13px] text-[rgba(0,0,0,0.5)] ">
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
