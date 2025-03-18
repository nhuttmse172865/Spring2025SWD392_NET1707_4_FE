/* eslint-disable no-unused-vars */
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../constants/localStorageName";

const Authorization  = ({ children, requiredRole }) => {
  const [accountLoginInformation, setAccountLoginInformation] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const role = jwtDecode(accountLoginInformation)?.roles;
      if (!role.includes(requiredRole)) navigate("/");
    } catch (error) {
      navigate("/")
    }
  }, [accountLoginInformation]);
  return children;
};

export default Authorization;
