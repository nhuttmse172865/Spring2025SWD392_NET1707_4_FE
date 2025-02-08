import React from "react";
import "./ElevatedButton.css";

const ElevatedButton = ({ text, handleOnclick, height, rounded  }) => {
  const classCustom =
    `bg-(--color-primary-90) hover:bg-(--color-primary-100) duration-300 ease-in px-12 py-2 cursor-pointer flex items-center justify-center h-[${height}] rounded-[${rounded}]`
  return (
    <div className={classCustom}>
      <span className="text-white text-elevated-button">{text}</span>
    </div>
  );
};

export default ElevatedButton;
