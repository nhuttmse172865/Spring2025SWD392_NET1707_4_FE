import React from "react";
import Navigation from "../../../components/customer/navigation/Navigation";
import { Outlet } from "react-router-dom";
import IMAGES from "../../../constants/images";

const CustomerService = () => {
  return (
    <>
      <img
        src={IMAGES.background}
        alt="Banner dưới Header"
        className="w-full h-[200px] object-cover container mx-auto"
      />
      <div className="flex container mx-auto w-full">
        <div className="w-[300px]">
          <Navigation />
        </div>
        <div className="p-4 bg-gray-100 flex flex-col w-full">
          <div className="h-auto min-h-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerService;
