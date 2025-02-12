
import React from "react";
import "./Navigation.css";
import Menu from "./menu/Menu";

const Navigation = () => {
  return (
    <div className="py-5 pr-5 bg-white service-navigation relative">
      <div className="mt-1 pb-5 relative overflow-y-auto">
        <Menu />
      </div>
    </div>
  );
};

export default Navigation;
