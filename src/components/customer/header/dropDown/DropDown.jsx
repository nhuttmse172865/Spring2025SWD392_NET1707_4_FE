import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LIST_MENU_DROP_DOWN_HEADER from "../../../../constants/menuDropDown";
import ROLES from "../../../../constants/role";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";

const DropDown = ({ active = true }) => {
  const navigate = useNavigate();
  const listMenu = LIST_MENU_DROP_DOWN_HEADER.filter((item) =>
    item.roles.includes(ROLES.CUSTOMER)
  );
  const [customer, setCustomer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const height = listMenu.length * 40 + 50;

  const handleItemClick = (item) => {
    if (item.title === "Logout") {
      setCustomer();
      window.location.reload();
      navigate("/");
    } else if (item.path) {
      navigate(item.path);
    }
  };

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
          key={index}
          className="flex gap-4 w-full h-[30px] items-center px-2.5 py-5 hover:bg-gray-100 rounded-[.375rem]"
          style={{ opacity: active ? 1 : 0 }}
          onClick={() => handleItemClick(item)}
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
