import React, { useState } from "react";
import ElevatedButton from "../../button/elevated/ElevatedButton";
import "./LoginForm.css";
import ICONS from "../../../../constants/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../../../../constants/base";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";
import VALIDATE from "../../../../constants/validate";

const LoginForm = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailInCorrect, setEmailInCorrect] = useState(false);
  const [messageErrorEmail, setMessageEmailError] = useState();
  const [passwordInCorrect, setPasswordInCorrect] = useState(false);
  const [messageErrorPassword, setMessageErrorPassword] = useState();
  const [loading, setLoading] = useState(false);

  const classInputEmail = `h-12 border-input-form-login text-(--color-title-100) text-[15px] ${
    emailInCorrect && "error"
  }`;
  const classInputPassword = `h-12 border-input-form-login text-(--color-title-100) text-[15px] ${
    passwordInCorrect && "error"
  }`;

  const handleValidateEmail = (value) => {
    if (value === null || value === "" || value === undefined) {
      setEmailInCorrect(true);
      setMessageEmailError("Email must be not empty!");
    } else if (VALIDATE.validateEmail(value)) {
      setEmailInCorrect(false);
    } else {
      setEmailInCorrect(true);
      setMessageEmailError("Email does not exist!");
    }
  };

  const handleValidatePassword = (value) => {
    if (value === null || value === "" || value === undefined) {
      setPasswordInCorrect(true);
      setMessageErrorPassword("Password must be not empty!");
    } else {
      setPasswordInCorrect(false);
    }
  };

  const handleLogin = async () => {
    handleValidateEmail(email)
    handleValidatePassword(password)
    if (emailInCorrect || passwordInCorrect || !email || !password) return;
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${BASE.BASE_URL}/login`, data);
      if (!response || response.status !== 200) throw new Error();
      setCustomer(response.data.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid items-center login-form-content max-w-[350px]">
      <div>
        <p className="mb-5 text-(--color-primary-100) text-[16px]">Login</p>
        <h1 className="font-family-playfair-display text-3xl text-(--color-title-100)">
          Welcome To Skincare Spa
        </h1>
        <p className="text-[15px] text-(--color-title-50) mt-1.5 mb-10">
          Skincare Booking System! Please enter your details
        </p>
      </div>
      <div>
        <div className="grid mb-4">
          <label className="text-[15px] mb-0.5 text-(--color-title-60)">
            Email
          </label>
          <input
            className={classInputEmail}
            type="text"
            placeholder="Example@gmail.com"
            onBlur={(event) => handleValidateEmail(event.target.value)}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailInCorrect && (
            <p className="text-[13px] mt-0.5 text-red-400">
              {messageErrorEmail}
            </p>
          )}
        </div>
        <div className="grid mb-7">
          <label className="text-[15px] mb-0.5 text-(--color-title-60)">
            Password
          </label>
          <input
            className={classInputPassword}
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordInCorrect && (
            <p className="text-[13px] mt-0.5 text-red-400">
              {messageErrorPassword}
            </p>
          )}
          <p className="text-[14px] mt-2 text-end text-(--color-title-50) cursor-pointer hover:text-(--color-title-70) ease-in duration-300">
            Forgot password ?
          </p>
        </div>
        <ElevatedButton
          text="Login"
          height="50px"
          rounded="0.375rem"
          handleOnclick={handleLogin}
          isLoading={loading}
        />
        <div></div>
      </div>
      <div className="line-or-line">
        <div className="line"></div>or
        <div className="line"></div>
      </div>
      <div className="login-other-button ease-in duration-300">
        <img src={ICONS.google} alt="" />
        <span className="text-[15px]">Sign in with Google</span>
      </div>
      <p className="text-[15px] text-(--color-title-50)">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/registrations")}
          className="text-(--color-primary-80) hover:text-(--color-primary-100) ease-in duration-300 font-semibold cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
