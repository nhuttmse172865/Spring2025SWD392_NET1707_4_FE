import React from "react";
import Header from "../../components/customer/header/Header";
import Footer from "../../components/customer/footer/Footer";
import { Outlet } from "react-router-dom";

const Customer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isShowButtonLogin={false} isShowSearch={true} isVerified={true} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Customer;
