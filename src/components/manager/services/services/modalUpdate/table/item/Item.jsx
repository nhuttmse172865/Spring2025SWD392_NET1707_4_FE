import React, { useEffect, useRef } from "react";
import CaculateGridColumn from "../../../../../../../helpers/CaculateGridColumn";
import ICONS from "../../../../../../../constants/icons";

const Item = ({
  listTitle,
  active = false,
  item,
  index,
  setShowModalUpdate,
  setItemUpdate,
  setServiceDetails,
  serviceDetails
}) => {
  const gridColumnTemplate = CaculateGridColumn(listTitle);
  const handleUpdateItem = () => {
    setShowModalUpdate(true);
    setItemUpdate(item);
  };

  const dragItem = useRef(null);

  const handleDragStart = (event, index) => {
    dragItem.current = index;
    event.dataTransfer.setData("serviceDetailIndex", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const droppedIndex = event.dataTransfer.getData("serviceDetailIndex");
    let list = [...serviceDetails];
    let item = list[droppedIndex]
    list.splice(droppedIndex, 1);
    list.splice(index, 0, item);
    list = list.map((item,index) => {
      item.day_order = index + 1
      return item;
    })
    setServiceDetails(list)
  };
  return (
    <ul
      className="gap-[15px] gap-x-5 text-[15px] text-[rgba(0,0,0,0.5)]  hover:bg-[rgba(0,0,0,0.05)]  grid justify-around items-center min-h-[80px] max-h-[80px] rounded-[.375rem] cursor-pointer relative"
      style={{
        gridTemplateColumns: gridColumnTemplate,
        padding: "10px 13px",
        boxShadow: active ? "0px 0px 1px 1px var(--color-primary-50)" : null,
      }}
      draggable="true"
      onDragStart={(event) => handleDragStart(event, index)}
      onDragOver={handleDragOver}
      onDrop={(event) => handleDrop(event, index)}
    >
      <li>{index + 1}</li>
      <li>{}</li>
      <li>{item?.name}</li>
      <li className="limited-lines-3">{item?.description}</li>
      <li>{item?.day_order}</li>
      <li>{item?.duration}</li>
      {item?.price}
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
