import React from "react";
import Header from "../../../components/customer/header/Header";
import LoginContent from "../../../components/common/form/login/content/LoginContent";
import LoginForm from "../../../components/common/form/login/LoginForm";
import RegisterForm from "../../../components/common/form/register/RegisterForm";
import RegisterEmail from "../../../components/common/form/register/email/RegisterEmail";
import ConfirmEmail from "../../../components/common/form/register/email/confirm/ConfirmEmail";
import { Outlet } from "react-router-dom";

function Register() {
  return (
    <div className="relative">
      <Header isShowButtonLogin={false} isShowSearch={false} />
      <div className="login-page-container">
        <div
          id="container-login"
          className="container mx-auto container-content-login grid grid-cols-12"
        >
          <div className="col-span-4" id="container-form-login">
            <Outlet />
          </div>
          <div className="ml-7 col-span-8">
            <LoginContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
