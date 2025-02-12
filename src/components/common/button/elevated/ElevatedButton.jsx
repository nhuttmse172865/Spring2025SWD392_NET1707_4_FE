import React from "react";

const ElevatedButton = ({ text, handleOnclick, height, rounded, width }) => {
  return (
    <div
      className="bg-(--color-primary-90) hover:bg-(--color-primary-100) duration-300 ease-in cursor-pointer flex items-center justify-center"
      style={{ height: height, borderRadius: rounded, width: width }}
      onClick={() => handleOnclick()}
    >
      <span className="text-white text-[15px] font-normal">{text}</span>
    </div>
  );
};

export default ElevatedButton;
