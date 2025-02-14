import React from "react";
import Navigation from "../../../components/customer/customerDetail/navigation/Navigation";
import { Outlet } from "react-router-dom";

const CustomerDetail = () => {
  return (
    <div className="min-h-screen container mx-auto">
      <div className="grid grid-cols-12 h-full mt-14 gap-5">
        <h4 className="col-span-12 text-[18px] mb-2 font-semibold text-[rgba(0,0,0,0.6)]">
          Customer Detail
        </h4>
        <div className="col-span-2">
          <Navigation />
        </div>
        <div className="col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
