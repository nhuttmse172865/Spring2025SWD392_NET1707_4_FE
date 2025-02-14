import React, { useEffect, useState } from "react";
import Header from "../../components/customer/header/Header";
import Footer from "../../components/customer/footer/Footer";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../constants/localStorageName";

const Customer = () => {
  const [customer,setCustomer] = useLocalStorage(LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE, "")
  const [isCustomer, setIsCustomer] = useState(false);
  useEffect(()=> {
    if(customer && jwtDecode(customer).roles.includes("USER")){
      setIsCustomer(true)
    }
  },[customer])
  return (
    <div className="flex flex-col min-h-screen">
      <Header isShowButtonLogin={!isCustomer} isShowSearch={!isCustomer} isVerified={isCustomer} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Customer;
