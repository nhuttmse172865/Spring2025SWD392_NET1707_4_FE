import React from "react";
import ICONS from "../../../../constants/icons";

const ElevatedButton = ({
  text,
  handleOnclick,
  height,
  rounded,
  width,
  isLoading = false,
}) => {
  return (
    <div
      className="bg-(--color-primary-90) hover:bg-(--color-primary-100) duration-300 ease-in cursor-pointer flex items-center justify-center"
      style={{ height: height, borderRadius: rounded, width: width }}
      onClick={() => handleOnclick()}
    >
      {!isLoading && (
        <span className="text-white text-[15px] font-normal">{text}</span>
      )}
      {isLoading && (
        <div className="flex gap-2.5">
          <img src={ICONS.loading} className="w-[20px] h-[20px] animate-spin" />
          <span className="text-white text-[15px] font-normal">
            Processing…
          </span>
        </div>
      )}
    </div>
  );
};

export default ElevatedButton;
