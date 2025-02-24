import React from "react";
import "./NavigationAdmin.css";
import IMAGES from "../../../constants/images";


import MenuAdmin from "../menu/MenuAdmin";

const NavigationAdmin = () => {
  return (
    <div className="h-[100vh] py-5 px-5 bg-white manager-navigation relative">
      <div className="manager-navigation-logo">
        <img src={IMAGES.logo} alt="" />
      </div>
      <div className="mt-8 pb-5 h-full relative">
        <MenuAdmin />
      </div>
    </div>
  );
};

export default NavigationAdmin;