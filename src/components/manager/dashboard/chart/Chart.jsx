import React, { useEffect, useState } from "react";

const Chart = () => {
  const [path, setPath] = useState();

  return (
    <div className="col-span-7 bg-white rounded-[.375rem] p-5">
      <div className="flex justify-between">
        <h6>Revenue Overview</h6>
        <div className="px-3.5 bg-[rgba(0,0,0,0.05)] rounded-[.375rem]">
          <span className="text-[14px] text-[rgba(0,0,0,0.5)]">Monthly</span>
        </div>
      </div>
      <svg className="bg-amber-200 w-full h-full">
        <path
          d={path}
          stroke="#2E47F9"
          stroke-width="4"
          stroke-linecap="round"
          fill="none"
        ></path>
      </svg>
    </div>
  );
};

export default Chart;
