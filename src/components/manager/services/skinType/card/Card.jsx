import React from "react";
import ICONS from "../../../../../constants/icons";

const Card = ({ item, handleOnClick, active = false, handleOnUpdate }) => {
  return (
    <div
      className="w-96 h-48 bg-white rounded-[.375rem] p-5 cursor-pointer overflow-hidden relative"
      style={
        active
          ? {
              boxShadow: "0px 0px 1px 1px var(--color-primary-50)",
            }
          : null
      }
      onClick={() => handleOnClick(item)}
    >
      <div onClick={(event) => handleOnUpdate(event,item)} className="absolute top-2.5 right-5">
        <img src={ICONS.update} alt="" />
      </div>
      <h4 className="font-semibold text-[16px] text-[rgba(0,0,0,0.5)]">
        Oily skin
      </h4>
      <p className="mt-3.5 text-[15px] font-light text-[rgba(0,0,0,0.5)] relative overflow-ellipsis line-clamp-5">
        This type produces excess oil, leading to a shiny appearance, enlarged
        pores, and a tendency to develop acne
      </p>
    </div>
  );
};

export default Card;
