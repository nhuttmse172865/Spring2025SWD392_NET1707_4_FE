import React from "react";
import CaculateGridColumn from "../../../../../../helpers/CaculateGridColumn";
import ICONS from "../../../../../../constants/icons";

const Item = ({ listTitle, active = false, item, index, page, setShowModalUpdate , setItemUpdate}) => {
  const gridColumnTemplate = CaculateGridColumn(listTitle);
  const hanldeUpdateItem = () => {
    setItemUpdate(item)
    setShowModalUpdate(true)
  }
  return (
    <ul
      className=" gap-[15px] text-[15px] text-[rgba(0,0,0,0.5)]  hover:bg-[rgba(0,0,0,0.05)]  grid justify-around items-center min-h-[77px] max-h-[77px] rounded-[.375rem] cursor-pointer relative"
      style={{
        gridTemplateColumns: gridColumnTemplate,
        padding: "10px 13px",
        boxShadow: active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
    >
      <li>{page*7 + index + 1}</li>
      <li>{item.name}</li>
      <li>{item.categoryName}</li>
      <li>{item.description}</li>
      <li className="flex flex-wrap gap-5">
        {Array.isArray(item.issueTypeName) &&
          item.issueTypeName.map((issueSkin, index) => (
            <span>
              {`${issueSkin} ${
                index !== item.issueTypeName.length - 1 ? "," : ""
              }`}
            </span>
          ))}
      </li>
      <li className="flex flex-wrap gap-5">
        {Array.isArray(item.skinTypeName) &&
          item.skinTypeName.map((skinType, index) => (
            <span>
              {`${skinType} ${
                index !== item.skinTypeName.length - 1 ? "," : ""
              }`}
            </span>
          ))}
      </li>
      <li>
        {Array.isArray(item.therapistsName) &&
          item.therapistsName.map((therapist, index) => (
            <span>
              {`${therapist} ${
                index !== item.therapistsName.length - 1 ? "," : ""
              }`}
            </span>
          ))}
      </li>
      <li></li>
      <div
        className="absolute top-0 right-3.5"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img src={ICONS.update} alt="" onClick={() => hanldeUpdateItem()} />
      </div>
    </ul>
  );
};

export default Item;
