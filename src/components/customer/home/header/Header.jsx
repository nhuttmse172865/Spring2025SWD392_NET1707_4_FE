import React from "react";
import "./Header.css";
import ElevatedButton from "../../../common/button/elevated/ElevatedButton";
import IMAGES from "../../../../constants/images";

const Header = () => {
  return (
    <div className="header-container">
      <div className="container mx-auto header-customer">
        <ul className="font-primary">
          <li>Home</li>
          <li>Our Services</li>
          <li>Price</li>
          <li>Booking</li>
          <li>Blog</li>
          <li>Contact us</li>
        </ul>
        <div className="header-logo">
          <img src={IMAGES.logo} alt="" />
        </div>
        <div>
           <ElevatedButton text="Login" />
        </div>
      </div>
    </div>
  );
};

export default Header;
