import React from "react";

const OutlineButton = ({ text, handleOnclick, height, rounded, width, active = true }) => {
  return (
    <div
      className="border-[1px] border-(--color-primary-80) hover:border-(--color-primary-100) duration-300 ease-in cursor-pointer flex items-center justify-center"
      style={{
        height: height,
        borderRadius: rounded,
        width: width,
        border: !active ? "1px solid var(--color-title-10)" : "",
      }}
    >
      <span
        className="text-(--color-primary-80) hover:text-(--color-primary-100) text-[15px]  duration-300 ease-in font-normal"
        style={{ color: !active ? "var(--color-title-30)" : "" }}
      >
        {text}
      </span>
    </div>
  );
};

export default OutlineButton;
