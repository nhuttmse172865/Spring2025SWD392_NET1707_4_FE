import React from "react";
import LIST_MENU_DROP_DOWN_HEADER from "../../../../constants/menuDropDown";
import ROLES from "../../../../constants/role";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate()
  const listNavigation = LIST_MENU_DROP_DOWN_HEADER.filter((item) =>
    item.roles.includes(ROLES.CUSTOMER)
  );
  return (
    <ul
      className="bg-gray-100 min-w-[200px] max-w-[250px] h-fit pt-5 pb-10 px-2.5 rounded-[.375rem]"
    >
      {listNavigation.map((item, index) => (
        <li onClick={() => navigate(item.path)} className="flex gap-4 w-full h-[50px] items-center px-2.5 py-5 hover:bg-white rounded-[.375rem] cursor-pointer">
          <img src={item.icon} alt="" className="w-[20px] h-[20px]" />
          <span className="text-[14px] text-[rgba(0,0,0,0.5)] ">
            {item.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
