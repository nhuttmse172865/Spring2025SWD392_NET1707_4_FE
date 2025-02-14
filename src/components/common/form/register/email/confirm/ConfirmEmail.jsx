import React, { useEffect, useState } from "react";
import ElevatedButton from "../../../../button/elevated/ElevatedButton";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../../constants/localStorageName";
import axios from "axios";
import BASE from "../../../../../../constants/base";
import { useNavigate } from "react-router-dom";

function ConfirmEmail() {
  const [guestInformation, setGuestInformation] = useLocalStorage(
    LOCALSTORAGE_NAME.GUEST_INFORMATION_CACHE,
    ""
  );
  const navigate = useNavigate();
  const [OTP, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const guest = atob(guestInformation).split(",");

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE.BASE_URL}/verify-otp?email=${guest[1]}&otp=${OTP}`
      );
      if (!response || response.status !== 200) throw new Error();
      const data = {
        password: guest[2],
        name: guest[0],
        email: guest[1],
      };
      const responseRegister = await axios.post(
        `${BASE.BASE_URL}/register`,
        data
      );
      if (!responseRegister || responseRegister.status !== 201)
        throw new Error();
      setGuestInformation("");
      navigate("/");
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const classInputCode = `h-12 border-input-form-login text-(--color-title-100) text-[15px] ${
    false && "error"
  }`;
  return (
    <div className="grid items-start mt-24 max-w-[350px]">
      <div className="mb-2">
        <p className="mb-5 text-(--color-primary-100) text-[16px]">Register</p>
        <h1 className="font-family-playfair-display text-3xl text-(--color-title-100)">
          Confirm your email address
        </h1>
        <p className="text-[15px] text-(--color-title-50) mt-5 mb-1.5">
          We sent an email to{" "}
          <span className="text-(--color-title-100)">{guest[1]}</span>. Please
          confirm your email address by enter your code
        </p>
      </div>
      <div className="grid mb-10 mt-5">
        <label className="text-[15px] mb-0.5 text-(--color-title-60)">
          Code<span className="text-red-500">*</span>
        </label>
        <input
          className={classInputCode}
          type="number"
          placeholder="Enter Code"
          onChange={(event) => setOTP(event.target.value)}
        />
        {false && (
          <p className="text-[13px] mt-0.5 text-red-400">Code is invalid!</p>
        )}
      </div>
      <ElevatedButton
        text="Verify"
        height="50px"
        handleOnclick={handleVerifyOtp}
        rounded="0.375rem"
        isLoading={loading}
      />
    </div>
  );
}

export default ConfirmEmail;
