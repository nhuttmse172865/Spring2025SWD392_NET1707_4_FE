import React, { useEffect, useState } from "react";
import "./LoginContent.css";
import IMAGES from "../../../../../constants/images";

const LoginContent = () => {
  const [widthContent, setWidthContent] = useState();
  const [widthContainer, setWidthContainer] = useState();

  const handleWidthContentLogin = () => {
    const widthContainerlogin =
      document.getElementById("container-login").clientWidth;
    const widthContainerFormLogin = document.getElementById(
      "container-form-login"
    ).clientWidth;
    if (widthContainerlogin) {
      setWidthContainer(
        (window.innerWidth - widthContainerlogin) / 2 +
          (widthContainerlogin - widthContainerFormLogin)
      );
      setWidthContent(widthContainerlogin - widthContainerFormLogin - 20);
    }
  };

  window.addEventListener("resize", () => {
    handleWidthContentLogin();
  });

  useEffect(() => {
    if (!widthContent) {
      handleWidthContentLogin();
    }
  });
  return (
    <div
      className="relative"
      style={{
        width: `${widthContainer - 28}px`,
        borderTopLeftRadius: "50px",
        height: `calc(100vh - 70px)`,
        overflow: "hidden"
      }}
    >
      <div className="h-full w-full relative">
        <img
          src={IMAGES.bannerLogin}
          className="min-h-full min-w-full object-cover"
        />
      </div>
      <div
        className="absolute bottom-0 w-[700px] bg-(--color-primary-100) pb-20 pl-10 pt-10 pr-10"
        style={{ borderTopRightRadius: "50px" }}
      >
        <h1 className="font-family-playfair-display text-5xl text-white font-semibold">
          Discover The Secrets Of Beauty
        </h1>
        <p className="mt-3 text-[rgba(255,255,255,0.6)] text-[15px] font-normal">
          Our luxurious treatments, personalized skincare regimens, and expert
          estheticians are dedicated to helping you discover the secrets to a
          more confident and rejuvenated you.
        </p>
      </div>
    </div>
  );
};

export default LoginContent;
