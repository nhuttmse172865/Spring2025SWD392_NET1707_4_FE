import React, { useEffect, useState } from "react";
import ICONS from "../../../constants/icons";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const HeaderStaff = () => {
  const location = useLocation()
  const [isHaveMessage, setIsHaveMessage] = useState(true);
  const [isHaveNotification, setIsHaveNotification] = useState(true);
  const [title,setTitle] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const useMapPath = (pathname) => {
    const map = {
      "/staff": { title: "Dashboard" },
      "/staff/checkin": { title: "CheckIn" },
      "/staff/checkout": { title: "CheckOut" },
      
    };
    return map[pathname] || { title: "" };
  };
  const token = localStorage.getItem('customer_information');
  const decode = jwtDecode(token);
  const accountId = decode.accountId;
  useEffect(() => {
    const item = useMapPath(location.pathname)
    setTitle(item?.title);
  },[location.pathname])
const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="h-[60px]  flex items-center pl-5 pr-30 justify-between bg-white rounded-3xl mt-2.5">
      <h6 className="text-[16px] font-medium text-[rgba(0,0,0,0.7)]">
        {title}
      </h6>
      <div className="flex gap-10">
        <div className="flex gap-2 relative">
          <div className="relative flex w-[35px] h-[35px] items-center justify-center rounded-[.375rem] cursor-pointer">
            {isHaveMessage && (
              <span className="absolute flex top-[5px] right-[5px]">
                <span className="absolute inline-flex h-[6px] w-[6px] animate-ping rounded-full bg-(--color-primary-70) opacity-75"></span>
                <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-(--color-primary-100)"></span>
              </span>
            )}
            <img src={ICONS.message} alt="" />
          </div>
          <div className="flex w-[35px] h-[35px] items-center justify-center rounded-[.375rem] cursor-pointer">
            {isHaveNotification && (
              <span className="absolute flex top-[5px] right-[9px]">
                <span className="absolute inline-flex h-[6px] w-[6px] animate-ping rounded-full bg-(--color-primary-70) opacity-75"></span>
                <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-(--color-primary-100)"></span>
              </span>
            )}
            <img src={ICONS.notification} alt="" />
          </div>
        </div>
        <div className="relative">
  <div
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="flex w-[35px] h-[35px] bg-[rgba(0,0,0,0.05)] items-center justify-center rounded-[.375rem] cursor-pointer"
  >
    <img src="" alt="" />
  </div>

  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-[120px] bg-white shadow-md rounded-md p-2 z-10">
      <button
        className="w-full text-left px-3 py-2  hover:bg-gray-100 text-red-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )}
</div>

     
      </div>
    </div>
  );
};

export default HeaderStaff;
