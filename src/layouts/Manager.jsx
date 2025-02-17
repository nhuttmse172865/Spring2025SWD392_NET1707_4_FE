import React from "react";
import Navigation from "../components/manager/navigation/Navigation";
import Header from "../components/manager/header/Header";
import { Outlet } from "react-router-dom";

const Manager = () => {
  return (
    <div className="flex h-[100vh] gap-x-6 bg-[#F7F7F7]">
      <div className="min-w-[250px] max-w-[300px] h-full">
        <Navigation />
      </div>
      <div className="w-full pr-6" >
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Manager;
