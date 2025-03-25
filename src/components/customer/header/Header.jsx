import { useEffect, useState } from "react";
import "./Header.css";
import ElevatedButton from "../../common/button/elevated/ElevatedButton";
import IMAGES from "../../../constants/images";
import Search from "../../common/search/Search";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../constants/localStorageName";
import { ToastContainer, toast } from "react-toastify"; // Added toast import
import "react-toastify/dist/ReactToastify.css";
import HeaderVerified from "./verified/HeaderVerified";

const Header = ({
  isShowSearch = false,
  isShowButtonLogin = false,
  isVerified = false,
}) => {
  const navigate = useNavigate();
  const [customer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    if (customer) {
      try {
        const token = customer;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );

        const decodedData = JSON.parse(jsonPayload);
        setAccountId(decodedData.accountId);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, [customer]);

  const handleBookingClick = () => {
    if (!customer || !accountId) {
      toast.info("Please log in to book this service", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate("/login"),
        style: { backgroundColor: "#ffffff", color: "#ff4f9d" },
      });
    } else {
      navigate("/booking");
    }
  };

  return (
    <div className="header-container">
      <div className="container mx-auto header-customer">
        <ul className="font-primary">
          <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Home
          </li>
          <li
            onClick={() => navigate("/customer-service")}
            style={{ cursor: "pointer" }}
          >
            Services
          </li>
          <li onClick={() => navigate("/price")} style={{ cursor: "pointer" }}>
            Price
          </li>
          <li
            onClick={() => navigate("/customer-view/therapist")}
            style={{ cursor: "pointer" }}
          >
            Doctor
          </li>
          <li onClick={() => navigate("/quiz")} style={{ cursor: "pointer" }}>
            Quiz
          </li>
          <li onClick={handleBookingClick} style={{ cursor: "pointer" }}>
            Booking
          </li>
          <li onClick={() => navigate("/blog")} style={{ cursor: "pointer" }}>
            Blog
          </li>
          <li
            onClick={() => navigate("/contact")}
            style={{ cursor: "pointer" }}
          >
            Contact
          </li>
        </ul>
        <div className="header-logo">
          <img src={IMAGES.logo} alt="" />
        </div>
        <div className="items-center">
          {isShowSearch && <Search />}
          {isShowButtonLogin && (
            <ElevatedButton
              handleOnclick={() => navigate("/login")}
              text="Login"
              width="150px"
              height="40px"
              rounded=".375rem"
            />
          )}
          {isVerified && <HeaderVerified />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
