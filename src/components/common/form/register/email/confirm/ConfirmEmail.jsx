import React from "react";
import ElevatedButton from "../../../../button/elevated/ElevatedButton";

function ConfirmEmail() {

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
          <span className="text-(--color-title-100)">
            nhutminhtran07@gmail.com
          </span>
          . Please confirm your email address by enter your code
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
        />
        {false && (
          <p className="text-[13px] mt-0.5 text-red-400">
            Code is invalid!
          </p>
        )}
      </div>
      <ElevatedButton text="Verify" height="50px" rounded="0.375rem" />
    </div>
  );
}

export default ConfirmEmail;
