import React from "react";


import { Outlet } from "react-router-dom";
import NavigationStaff from "../../../components/staff/navigation/Navigation";

import HeaderStaff from "../../../components/staff/header/HeaderStaff";

const Staff = () => {
  return (
    <div className="min-h-screen flex bg-pink-300-100 ">
      <div className="min-w-[250px] max-w-[300px] bg-white ">
        <NavigationStaff />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden" >
      <HeaderStaff/>
        <div className="flex-1 overflow-y-auto pe-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Staff;