import React from "react";
import ICONS from "../../../../../../constants/icons";

const Item = ({ active = false, item, setShowModal, setItemUpdate, handleOnClick }) => {
  const handleUpdateItem = (item) => {
    setItemUpdate(item)
    setShowModal(true)
  }
  return (
    <ul
      className="text-[15px] relative font-normal text-[rgba(0,0,0,0.5)] hover:bg-white  ease-in duration-200 cursor-pointer  grid justify-around items-center rounded-[0.375rem] gap-[15px] h-[80px]"
      style={{
        gridTemplateColumns: "0.5fr 1fr 2fr 3fr 5fr 0.5fr",
        padding: "0 15px",
        boxShadow: active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
      onClick={() => handleOnClick(item)}
    >
      <li></li>
      <li>{item.name}</li>
      <li className="flex flex-wrap gap-2">
        {item.ages &&
          Array.isArray(item.ages) &&
          item.ages.map((age) => <span
            className="px-4 rounded-[.375rem]"
          style={{
            backgroundColor: age.backgroundColor,
            color: age.textColor
          }}>{age.name}</span>)}
      </li>
      <li>{item.cause}</li>
      <li>{item.description}</li>
      <li></li>
      <div
        className="absolute top-0 right-3.5"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={() => handleUpdateItem(item)}
      >
        <img src={ICONS.update} alt="" />
      </div>
    </ul>
  );
};

export default Item;
