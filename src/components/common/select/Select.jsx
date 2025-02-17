import React, { useState } from "react";
import ICONS from "../../../constants/icons";

const Select = ({
  width = "200px",
  height = "50px",
  list,
  text = "Choose age...",
  mutilpleSelect = false,
  modeShowTextOnInput = false,
  setListSelected
}) => {
  const [active, setActive] = useState(false);
  const [itemsSelected, setItemsSelected] = useState();
  const [mouseover, setMouseover] = useState(false);
  const heightItems = list?.length * 40 + (list?.length)*5 + 19;

  const handleOnclick = (item) => {
    let listItemsSelected;
    if (mutilpleSelect) {
      if (!itemsSelected) {
        listItemsSelected = [item]
        setItemsSelected(listItemsSelected);
      } else if (itemsSelected.includes(item)) {
        listItemsSelected = itemsSelected.filter((element) => element !== item)
        setItemsSelected(listItemsSelected);
      } else {
        listItemsSelected = [...itemsSelected, item]
        setItemsSelected(listItemsSelected);
      }
    } else {
      listItemsSelected = item
      setItemsSelected(item);
    }
    if(modeShowTextOnInput && setListSelected){
      setListSelected(listItemsSelected)
    }
  };

  return (
    <div
      className="cursor-pointer border-input-form-login relative flex items-center p-[12px]"
      style={{
        width: width,
        height: height,
      }}
      onClick={() => setActive((prev) => !prev)}
      onMouseEnter={() => setMouseover(true)}
      onMouseLeave={() => setMouseover(false)}
    >
      <div className="text-[rgba(0,0,0,0.8)] text-[14px]">
        {modeShowTextOnInput && (
          <span className="text-(--color-title-40)">{text}</span>
        )}
        {!modeShowTextOnInput &&
        itemsSelected &&
        Array.isArray(itemsSelected) ? (
          itemsSelected.map((item, index) => <span key={index}>{item}</span>)
        ) : !modeShowTextOnInput ? (
          <span>{itemsSelected}</span>
        ) : null}
      </div>
      <ul
        className="absolute bg-white h-mx top-[100%] duration-200 ease-in left-0 pt-[7px] px-[12px] rounded-[.375rem]"
        style={{
          boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.1)",
          transform: "translateX(-2px)",
          width: `calc(${width} + 2px)`,
          height: active ? heightItems : 0,
          opacity: active ? 1 : 0,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {list &&
          list.map((item,index) => (
            <li
              key={index}
              className="items-center flex rounded-[.375rem] duration-100 ease-in pl-[12px] text-[rgba(0,0,0,0.7)] hover:bg-[rgba(0,0,0,0.1)] text-[15px] mt-[5px]"
              style={{
                opacity: active ? 1 : 0,
                height: active ? "40px" : 0,
                backgroundColor:
                  itemsSelected &&
                  Array.isArray(itemsSelected) &&
                  itemsSelected.includes(item)
                    ? "var(--color-primary-70)"
                    : itemsSelected === item
                    ? "var(--color-primary-70)"
                    : null,
                color:
                  itemsSelected &&
                  Array.isArray(itemsSelected) &&
                  itemsSelected.includes(item)
                    ? "#FFFFFF"
                    : itemsSelected === item
                    ? "#FFFFFF"
                    : null,
              }}
              onClick={() => handleOnclick(item)}
            >
              {item}
            </li>
          ))}
      </ul>
      {mouseover && (
        <img
          src={ICONS.arrowActive}
          className="absolute right-1 w-[24px] h-[24px] duration-300"
          style={{
            transform: active ? `rotate(${180}deg) ` : `rotate(${0}deg) `,
          }}
          alt=""
        />
      )}
    </div>
  );
};

export default Select;
