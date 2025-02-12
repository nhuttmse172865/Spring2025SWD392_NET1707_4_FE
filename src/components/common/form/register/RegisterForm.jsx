import React from "react";
import RegisterMethod from "./method/RegisterMethod";

function RegisterForm() {
  return (
    <div className="grid items-start mt-24 max-w-[350px]">
      <div className="mb-10">
        <p className="mb-5 text-(--color-primary-100) text-[16px]">Register</p>
        <h1 className="font-family-playfair-display text-3xl text-(--color-title-100)">
          Welcome To Skincare Spa
        </h1>
        <p className="text-[15px] text-(--color-title-50) mt-1.5 mb-10">
          Skincare Booking System! Please enter your details
        </p>
      </div>
      <RegisterMethod />
    </div>
  );
}

export default RegisterForm;
