import React from "react";
import ElevatedButton from "../../../button/elevated/ElevatedButton";
import ICONS from "../../../../../constants/icons";
import { useNavigate } from "react-router-dom";

function RegisterMethod() {
  const navigate = useNavigate();

  return (
    <>
      <ElevatedButton
        text="Sign Up With Email"
        height="50px"
        rounded="0.375rem"
        handleOnclick={() => navigate("email")}
      />
      <div className="line-or-line mt-5!">
        <div className="line"></div>or
        <div className="line"></div>
      </div>
      <div className="login-other-button ease-in duration-300 mt-5!">
        <img src={ICONS.google} alt="" />
        <span className="text-[15px]">Sign up with Google</span>
      </div>
      <p className="text-[15px] text-(--color-title-50)">
        You already have account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-(--color-primary-80) hover:text-(--color-primary-100) ease-in duration-300 font-semibold cursor-pointer"
        >
          Login
        </span>
      </p>{" "}
    </>
  );
}

export default RegisterMethod;
