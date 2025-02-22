import React from "react";
import ICONS from "../../../../constants/icons";

const OutlineButton = ({
  text,
  handleOnclick,
  height,
  rounded,
  width,
  active = true,
  isLoading = false,
}) => {
  return (
    <div
      className="border-[1px] border-(--color-primary-80) hover:border-(--color-primary-100) duration-300 ease-in cursor-pointer flex items-center justify-center"
      style={{
        height: height,
        borderRadius: rounded,
        width: width,
        border: !active ? "1px solid var(--color-title-10)" : "",
      }}
      onClick={() => handleOnclick()}
    >
      {!isLoading && (
        <span
          className="text-(--color-primary-80) hover:text-(--color-primary-100) text-[15px]  duration-300 ease-in font-normal"
          style={{ color: !active ? "var(--color-title-30)" : "" }}
        >
          {text}
        </span>
      )}
      {isLoading && (
        <div className="flex gap-2.5">
          <img src={ICONS.loadingActive} className="w-[20px] h-[20px] animate-spin" />
          <span  className="text-(--color-primary-80) hover:text-(--color-primary-100) text-[15px]  duration-300 ease-in font-normal">
            Processing…
          </span>
        </div>
      )}
    </div>
  );
};

export default OutlineButton;
