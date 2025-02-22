import React from "react";
import Filter from "../filter/Filter";
import Search from "../search/Search";
import ElevatedButton from "../button/elevated/ElevatedButton";
import OutlineButton from "../button/outline/OutlineButton";

const ToolBar = ({
  textOutlineButton = "Delete",
  textElevatedButton = "Add",
  heightOutline = "40px",
  widthOutline = "150px",
  heightElevated = "40px",
  widthElevated = "150px",
  rounded = ".375rem",
  activeOutlineButton = false,
  handleOnClickOutline,
  handleOnClickElevated,
  isLoadingOutline,
  isShowOulineButton = true,
  isShowElevatedButton = true,
}) => {
  return (
    <div className="flex justify-between items-end">
      <div className="flex justify-start items-end">
        <Filter />
      </div>
      <div className="flex justify-end items-end gap-5">
        <Search />
        {isShowOulineButton && (
          <OutlineButton
            text={textOutlineButton}
            height={heightOutline}
            width={widthOutline}
            rounded={rounded}
            active={activeOutlineButton}
            handleOnclick={handleOnClickOutline}
            isLoading={isLoadingOutline}
          />
        )}
        {isShowElevatedButton && (
          <ElevatedButton
            text={textElevatedButton}
            height={heightElevated}
            width={widthElevated}
            rounded={rounded}
            handleOnclick={handleOnClickElevated}
          />
        )}
      </div>
    </div>
  );
};

export default ToolBar;
