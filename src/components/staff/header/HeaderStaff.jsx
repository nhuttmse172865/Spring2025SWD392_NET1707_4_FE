import React, { useEffect, useState } from "react";
import ICONS from "../../../constants/icons";
import { useLocation } from "react-router-dom";


const HeaderStaff = () => {
  const location = useLocation()
  const [isHaveMessage, setIsHaveMessage] = useState(true);
  const [isHaveNotification, setIsHaveNotification] = useState(true);
  const [title,setTitle] = useState()
  const useMapPath = (pathname) => {
    const map = {
      "/staff": { title: "Dashboard" },
      "/staff/checkin": { title: "CheckIn" },
    };
    return map[pathname] || { title: "" };
  };
  useEffect(() => {
    const item = useMapPath(location.pathname)
    setTitle(item?.title);
  },[location.pathname])

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
        <div className="flex w-[35px] h-[35px] bg-[rgba(0,0,0,0.05)] items-center justify-center rounded-[.375rem] cursor-pointer">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeaderStaff;
