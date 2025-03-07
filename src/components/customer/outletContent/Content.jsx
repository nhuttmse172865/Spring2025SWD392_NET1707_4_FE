import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import BASE from "../../../constants/base";
import "./Content.css";

const Content = () => {
  const [sortType, setSortType] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchServices();
  }, []);

  const getFilteredServices = () => {
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
  };

  const handleServiceClick = (service) => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    console.log(service);
    navigate("/customer-service/service-details");
  };

  const handleBookClick = (id) => {
    localStorage.setItem("selectedServiceId", id);
    navigate("/booking");
  };

  const sortServices = (services) => {
    switch (sortType) {
      case "nameAZ":
        return [...services].sort((a, b) => a.name.localeCompare(b.name));
      case "nameZA":
        return [...services].sort((a, b) => b.name.localeCompare(a.name));
      case "priceLowHigh":
        return [...services].sort((a, b) => a.price - b.price);
      case "priceHighLow":
        return [...services].sort((a, b) => b.price - a.price);
      default:
        return services;
    }
  };

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat("vi-VN").format(price);
  // };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const servicesPerPage = 6;
  const pageCount = Math.ceil(getFilteredServices().length / servicesPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentServices = sortServices(getFilteredServices()).slice(
    currentPage * servicesPerPage,
    (currentPage + 1) * servicesPerPage
  );

  return (
    <div className="spa-container">
      <div className="sort-container">
        <span className="sort-label">Sort by:</span>
        <div className="sort-buttons">
          <button
            className={`sort-button ${sortType === "default" ? "active" : ""}`}
            onClick={() => setSortType("default")}
          >
            Default
          </button>
          <button
            className={`sort-button ${sortType === "nameAZ" ? "active" : ""}`}
            onClick={() => setSortType("nameAZ")}
          >
            Name A-Z
          </button>
          <button
            className={`sort-button ${sortType === "nameZA" ? "active" : ""}`}
            onClick={() => setSortType("nameZA")}
          >
            Name Z-A
          </button>
          <button
            className={`sort-button ${
              sortType === "priceLowHigh" ? "active" : ""
            }`}
            onClick={() => setSortType("priceLowHigh")}
          >
            Price Low to High
          </button>
          <button
            className={`sort-button ${
              sortType === "priceHighLow" ? "active" : ""
            }`}
            onClick={() => setSortType("priceHighLow")}
          >
            Price High to Low
          </button>
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
                src={service.image}
                alt={service.name}
                className="service-image"
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
  );
};

export default Content;
