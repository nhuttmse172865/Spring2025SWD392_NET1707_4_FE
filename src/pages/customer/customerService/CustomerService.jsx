

import React from "react";
import Navigation from "../../../components/customer/navigation/Navigation";
import Header from "../../../components/customer/header/Header";
import Footer from "../../../components/customer/footer/Footer";
import { Outlet } from "react-router-dom";
import IMAGES from "../../../constants/images";

const CustomerService = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

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
            <Footer />
        </div>
    );
};

export default CustomerService;
