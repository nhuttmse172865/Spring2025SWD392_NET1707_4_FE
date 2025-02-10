import React, { useState } from "react";
import "./Header.css";
import ElevatedButton from "../../common/button/elevated/ElevatedButton";
import IMAGES from "../../../constants/images";
import Search from "../../common/search/Search";

const Header = ({isShowSearch = true, isShowButtonLogin = true}) => {
  return (
    <div className="header-container">
      <div className="container mx-auto header-customer">
        <ul className="font-primary">
          <li>Home</li>
          <li>Services</li>
          <li>Price</li>
          <li>Booking</li>
          <li>Blog</li>
          <li>Contact us</li>
        </ul>
        <div className="header-logo">
          <img src={IMAGES.logo} alt="" />
        </div>
        <div>
          {isShowSearch && <Search />} 
          {isShowButtonLogin &&  <ElevatedButton text="Login" rounded=".375rem"/>}
        </div>
      </div>
    </div>
  );
};

export default Header;
