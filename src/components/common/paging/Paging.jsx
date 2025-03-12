import React from "react";
import ICONS from "../../../constants/icons";

const Paging = ({ numberPages, page, setPage }) => {
  return (
    <div className="w-full h-[30px] flex justify-center items-center gap-x-2.5 mt-5 cursor-pointer">
      <div className="w-[30px] h-[30px] bg-[#FFFFFF] rounded-[.375rem] flex justify-center items-center"
        onClick={() => setPage(page - 1 >= 0 ? page - 1 : 0)}
      >
        <img src={ICONS.arrow} />
      </div>
      <div className="flex gap-x-2.5">
        {numberPages &&
          Array.from({ length: numberPages }).map((item, index) => (
            <div
              className="w-[30px] h-[30px] bg-[#FFFFFF] rounded-[.375rem] flex justify-center items-center cursor-pointer"
              style={{ background: Number(index) === Number(page) ? "var(--color-primary-100)" : null }}
              onClick={() => setPage(index)}
            >
              <span
                className="text-[14px] text-[rgba(0,0,0,0.5)]"
                style={{ color:Number(index) === Number(page) ? "#FFFFFF" : null}}
              >
                {index + 1}
              </span>
            </div>
          ))}
      </div>
      <div className="w-[30px] h-[30px] bg-[#FFFFFF] rounded-[.375rem] flex justify-center items-center cursor-pointer" 
        onClick={() => setPage(page + 1 < numberPages ? page + 1 : numberPages -1)}
      >
        <img src={ICONS.arrow} className="rotate-180" />
      </div>
    </div>
  );
};

export default Paging;
