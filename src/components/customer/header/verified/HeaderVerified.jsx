import React, { useState } from "react";
import ICONS from "../../../../constants/icons";
import DropDown from "../dropDown/DropDown";

function HeaderVerified() {
  const [isHaveMessage, setIsHaveMessage] = useState(true);
  const [isHaveNotification, setIsHaveNotification] = useState(true);
  const [activeDropDown, setActiveDropDown] = useState(false);

  return (
    <div className="flex gap-10 items-center">
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
      <div className="relative flex w-[35px] h-[35px] bg-[rgba(0,0,0,0.05)] items-center justify-center rounded-[.375rem] cursor-pointer">
        <div onClick={() => setActiveDropDown((prev) => !prev)} className="z-[1000] w-full h-full rounded-[.375rem]">
          <img src="" alt="" />
        </div>
        <DropDown active={activeDropDown} />
      </div>
    </div>
  );
}

export default HeaderVerified;
