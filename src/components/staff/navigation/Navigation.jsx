import React from "react";
import "./Navigation.css";
import IMAGES from "../../../constants/images";

import MenuStaff from "../menu/MenuStaff";

const NavigationStaff = () => {
  return (
    <div className="h-[100vh] py-5 px-5 bg-white manager-navigation relative">
      <div className="manager-navigation-logo">
        <img src={IMAGES.logo} alt="" />
      </div>
      <div className="mt-8 pb-5 h-full relative">
        <MenuStaff />
      </div>
    </div>
  );
};

export default NavigationStaff;