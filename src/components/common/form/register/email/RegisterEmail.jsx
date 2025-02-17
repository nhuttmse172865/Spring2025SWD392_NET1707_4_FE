import React, { useState } from "react";
import ElevatedButton from "../../../button/elevated/ElevatedButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../../../../../constants/base";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../constants/localStorageName";
import VALIDATE from "../../../../../constants/validate";

function RegisterEmail() {
  const navigate = useNavigate();
  const [guestInformation, setGuestInformation] = useLocalStorage(
    LOCALSTORAGE_NAME.GUEST_INFORMATION_CACHE,
    ""
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailInCorrect, setEmailInCorrect] = useState(false);
  const [messageErrorEmail, setMessageEmailError] = useState();
  const [passwordInCorrect, setPasswordInCorrect] = useState(false);
  const [messageErrorPassword, setMessageErrorPassword] = useState();

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

  const handleSignUp = async () => {
    handleValidateEmail(email)
    handleValidatePassword(password)
    if (emailInCorrect || passwordInCorrect || !email || !password) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE.BASE_URL}/send-otp?email=${email}`
      );
      if (!response || response.status !== 200) throw new Error();
      const guest = [name, email, password];
      setGuestInformation(btoa(guest));
      navigate("/registrations/confirm-email");
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const classInputName = `h-12 border-input-form-login text-(--color-title-100) text-[15px] ${
    false && "error"
  }`;
  const classInputEmail = `h-12 border-input-form-login text-(--color-title-100) text-[15px] ${
    false && "error"
  }`;
  const classInputPassword = `h-12 border-input-form-login text-(--color-title-100) text-[15px] ${
    false && "error"
  }`;
  return (
    <div className="grid items-start mt-24 max-w-[350px]">
      <div className="mb-2">
        <p className="mb-5 text-(--color-primary-100) text-[16px]">Register</p>
        <h1 className="font-family-playfair-display text-3xl text-(--color-title-100)">
          Sign up with Email
        </h1>
        <p className="text-[15px] text-(--color-title-50) mt-1.5 mb-10">
          Sign up with{" "}
          <span
            onClick={() => navigate("/registrations")}
            className="text-(--color-primary-70) font-medium cursor-pointer"
          >
            Google
          </span>{" "}
          instead
        </p>
      </div>
      <div className="grid mb-4">
        <label className="text-[15px] mb-0.5 text-(--color-title-60)">
          Name
        </label>
        <input
          className={classInputName}
          type="text"
          placeholder="Your name"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="grid mb-4">
        <label className="text-[15px] mb-0.5 text-(--color-title-60)">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          className={classInputEmail}
          type="text"
          placeholder="Email address"
          onBlur={(event) => handleValidateEmail(event.target.value)}
          onChange={(event) => setEmail(event.target.value)}
        />
        {emailInCorrect && (
          <p className="text-[13px] mt-0.5 text-red-400">
            {messageErrorEmail}
          </p>
        )}
      </div>
      <div className="grid mb-10">
        <label className="text-[15px] mb-0.5 text-(--color-title-60)">
          Password<span className="text-red-500">*</span>
        </label>
        <input
          className={classInputPassword}
          type="password"
          placeholder="Password"
          onBlur={(event) => handleValidatePassword(event.target.value)}
          onChange={(event) => setPassword(event.target.value)}
        />
        {passwordInCorrect && (
          <p className="text-[13px] mt-0.5 text-red-400">
           {messageErrorPassword}
          </p>
        )}
      </div>
      <ElevatedButton
        text="Sign up"
        height="50px"
        rounded="0.375rem"
        handleOnclick={handleSignUp}
        isLoading={loading}
      />
      <p className="text-[15px] text-(--color-title-50) mt-20">
        You already have account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-(--color-primary-80) hover:text-(--color-primary-100) ease-in duration-300 font-semibold cursor-pointer"
        >
          Login
        </span>
      </p>{" "}
    </div>
  );
}

export default RegisterEmail;
