import React from "react";
import CaculateGridColumn from "../../../../../../helpers/CaculateGridColumn";
import ICONS from "../../../../../../constants/icons";

const Item = ({listTitle, active= false, setShowModal, item, index, setItemUpdate}) => {
  const gridColumnTemplate = CaculateGridColumn(listTitle);
  
  const handleUpdateItem = () => {
    setShowModal(true)
    setItemUpdate(item)
  }

  return (
    <ul
      className=" gap-[15px] text-[15px] text-[rgba(0,0,0,0.5)]  hover:bg-[rgba(0,0,0,0.05)]  grid justify-around items-center min-h-[80px] max-h-[100px] rounded-[.375rem] cursor-pointer relative"
      style={{
        gridTemplateColumns: gridColumnTemplate,
        padding: "10px 13px",
        boxShadow: active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
    >
      <li>{index + 1}</li>
      <li>{item.account.name}</li>
      <li>{item.account.email}</li>
      <li>{item.account.phone}</li>
      <li>{item.experience} year</li>
      <li>{item.account.gender}</li>
      <li>{item.account.status}</li>
      <li></li>
      <div
        className="absolute top-0 right-3.5"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img src={ICONS.update} alt="" onClick={() => handleUpdateItem()} />
      </div>
    </ul>
  );
};

export default Item;
