import React from "react";
import ICONS from "../../../../../constants/icons";

const Card = ({ item, handleOnClick, active = false, handleOnUpdate }) => {
  return (
    <div
      className="w-[300px] h-fit bg-white rounded-[.375rem] p-5 cursor-pointer overflow-hidden relative"
      style={
        active
          ? {
              boxShadow: "0px 0px 1px 1px var(--color-primary-50)",
            }
          : null
      }
      onClick={() => handleOnClick(item)}
    >
      <h4 className="font-semibold text-[18px] text-(--color-title-50)">
        Category
      </h4>
      <span className="font-light text-[13px] text-(--color-title-50)">Lorem Ipsum is simply dummy</span>
      <div className="mt-4 flex gap-1 items-end">
        <span className="text-[40px] text-(--color-title-80)">20</span>
        <span className="font-light text-[13px] text-(--color-title-50)">services</span>
        <div onClick={(event) => handleOnUpdate(event,item)} className="absolute w-[80px] h-[35px] bg-(--color-primary-80) hover:bg-(--color-primary-100) ease-in-out duration-300  right-5 rounded-[.375rem] flex items-center justify-center">
            <img src={ICONS.updateWhite} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Card;
