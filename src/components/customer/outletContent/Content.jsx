import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import BASE from "../../../constants/base";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../constants/localStorageName";
import { ToastContainer, toast } from "react-toastify";
import Authorization from "../../../middleware/Authorization";
import "react-toastify/dist/ReactToastify.css";
import "./Content.css";

import ROLES from "../../../constants/role";

const SERVICES_PER_PAGE = 9;

const Content = React.memo(() => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const [services, setServices] = useState([]);
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

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
      );
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }, []);

  const handleServiceClick = useCallback(
    (service) => {
      localStorage.setItem("selectedService", JSON.stringify(service));
      navigate("/customer-service/service-details");
    },
    [navigate]
  );

  const handleBookClick = useCallback(
    (id) => {
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
        localStorage.setItem("selectedServiceId", id);
        navigate("/booking");
      }
    },
    [navigate, customer, accountId]
  );

  const handlePageClick = useCallback((data) => {
    setCurrentPage(data.selected);
  }, []);

  const filteredServices = useMemo(() => {
    let filtered = [...services];
    const selectedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];
    if (selectedCategories.length) {
      filtered = filtered.filter((service) =>
        selectedCategories.includes(service.categoryId)
      );
    }
    const selectedPriceRanges =
      JSON.parse(localStorage.getItem("selectedPriceRanges")) || [];
    if (selectedPriceRanges.length) {
      filtered = filtered.filter((service) =>
        selectedPriceRanges.some(
          (range) => service.total >= range.min && service.total <= range.max
        )
      );
    }
    return filtered;
  }, [services]);

  const sortedServices = useMemo(() => {
    switch (sortType) {
      case "nameAZ":
        return [...filteredServices].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "nameZA":
        return [...filteredServices].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      case "priceLowHigh":
        return [...filteredServices].sort((a, b) => a.total - b.total);
      case "priceHighLow":
        return [...filteredServices].sort((a, b) => b.total - a.total);
      default:
        return filteredServices;
    }
  }, [filteredServices, sortType]);

  const pageCount = Math.ceil(sortedServices.length / SERVICES_PER_PAGE);

  const currentServices = useMemo(() => {
    const start = currentPage * SERVICES_PER_PAGE;
    const end = start + SERVICES_PER_PAGE;
    return sortedServices.slice(start, end);
  }, [sortedServices, currentPage]);

  return (
    <Authorization requiredRole={ROLES.CUSTOMER}>
      <div className="spa-container">
        <ToastContainer />

        <div className="sort-container">
          <span className="sort-label">Sort by:</span>
          <div className="sort-buttons">
            {[
              { type: "default", label: "Default" },
              { type: "nameAZ", label: "Name A-Z" },
              { type: "nameZA", label: "Name Z-A" },
              { type: "priceLowHigh", label: "Price Low to High" },
              { type: "priceHighLow", label: "Price High to Low" },
            ].map(({ type, label }) => (
              <button
                key={type}
                className={`sort-button ${sortType === type ? "active" : ""}`}
                onClick={() => setSortType(type)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="services-grid">
          {currentServices.map((service) => (
            <div
              key={service.id || service.name}
              className="service-card"
              onClick={() => handleServiceClick(service)}
            >
              <div className="service-image-container">
                <img
                  src={
                    service.image && service.image.length > 0
                      ? service.image[0].url
                      : "https://via.placeholder.com/150"
                  }
                  alt={service.name}
                  className="service-image-main"
                  loading="lazy"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              </div>
              <div className="service-info">
                <h3 className="service-title">Service: {service.name}</h3>
                <div className="service-action">
                  <p className="service-price">{formatPrice(service.total)}</p>
                  <button
                    className="book-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookClick(service.id);
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          previousClassName={"previous-item"}
          nextClassName={"next-item"}
        />
      </div>
    </Authorization>
  );
});

export default Content;
