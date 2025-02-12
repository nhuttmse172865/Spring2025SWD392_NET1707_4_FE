import React from "react";
import ICONS from "../../../../../../constants/icons";

const Item = ({active = false}) => {
  return (
    <ul
      className="text-[15px] relative font-normal text-[rgba(0,0,0,0.7)] hover:bg-white ease-in duration-200 cursor-pointer  grid justify-around items-center rounded-[0.375rem] gap-[15px] h-[80px]"
      style={{
        gridTemplateColumns: "0.5fr 1fr 2fr 3fr 5fr 0.5fr",
        padding: "0 15px",
        boxShadow:active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
    >
      <li>1</li>
      <li>Acne</li>
      <li>Teens, Young Adults</li>
      <li>Hormones, bacteria, oil, clogged pores</li>
      <li>Pimples, blackheads, whiteheads, cysts, papules, pustules</li>
      <li></li>
      <div
        className="absolute top-0 right-3.5"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img src={ICONS.update} alt="" />
      </div>
    </ul>
  );
};

export default Item;
