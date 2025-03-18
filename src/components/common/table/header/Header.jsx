import React from "react";
import CaculateGridColumn from "../../../../helpers/CaculateGridColumn";

const Header = ({ listTitle, backgroundColor, gapX , height = 50, textColor = "rgba(0,0,0,0.6)"}) => {
  const gridColumnTemplate = CaculateGridColumn(listTitle);
  return (
    <ul
      className="font-semibold text-[14px] bg-white grid justify-around items-center rounded-[0.375rem] gap-[15px]"
      style={{
        gridTemplateColumns: gridColumnTemplate,
        padding: "0 15px",
        backgroundColor: backgroundColor,
        columnGap: gapX,
        height: height,
        color: textColor
      }}
    >
      {Array.isArray(listTitle) &&
        listTitle.map((item) => <li>{item.name}</li>)}
    </ul>
  );
};

export default Header;
