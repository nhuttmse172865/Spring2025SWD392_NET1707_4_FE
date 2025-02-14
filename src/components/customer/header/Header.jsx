import React, { useState } from "react";
import "./Header.css";
import ElevatedButton from "../../common/button/elevated/ElevatedButton";
import IMAGES from "../../../constants/images";
import Search from "../../common/search/Search";
import { useNavigate } from "react-router-dom";
import HeaderVerified from "./verified/HeaderVerified";

const Header = ({
  isShowSearch = false,
  isShowButtonLogin = false,
  isVerified = false,
}) => {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="container mx-auto header-customer">
        <ul className="font-primary">
          <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Home
          </li>
          <li
            onClick={() => navigate("/customer-service")}
            style={{ cursor: "pointer" }}
          >
            Services
          </li>
          <li>Price</li>
          <li
            onClick={() => navigate("/booking")}
            style={{ cursor: "pointer" }}
          >
            Booking
          </li>
          <li onClick={() => navigate("/blog")} style={{ cursor: "pointer" }}>
            Blog
          </li>
          <li
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer" }}
          >
            Contact us
          </li>
        </ul>
        <div className="header-logo">
          <img src={IMAGES.logo} alt="" />
        </div>
        <div className="items-center">
          {isShowSearch && <Search />}
          {isShowButtonLogin && (
            <ElevatedButton
              handleOnclick={() => navigate("/login")}
              text="Login"
              width="150px"
              height="40px"
              rounded=".375rem"
            />
          )}
          {isVerified && <HeaderVerified />}
        </div>
      </div>
    </div>
  );
};

export default Header;
