import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <ul className="manager-header-table font-medium text-[14px] text-[rgba(0,0,0,0.5)] bg-white grid justify-around items-center rounded-[0.375rem] gap-[15px] h-[50px]"
      style={{gridTemplateColumns:  "0.5fr 1fr 2fr 3fr 5fr 0.5fr", padding: "0 15px"}}
    >
      <li>No.</li>
      <li>Name</li>
      <li>Age</li>
      <li>Common Cause</li>
      <li>Description</li>
      <li></li>
    </ul>
  );
};

export default Header;
