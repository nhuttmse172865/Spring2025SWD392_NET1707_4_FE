import React from "react";
import ElevatedButton from "../../../../../common/button/elevated/ElevatedButton";

const Header = ({ setShowModal }) => {
  return (
    <div className="w-full h-[65px] flex justify-end p-2.5">
      <ElevatedButton
        width="150px"
        height="45px"
        rounded=".375rem"
        text="Add"
        handleOnclick={() => setShowModal(true)}
      />
    </div>
  );
};

export default Header;
