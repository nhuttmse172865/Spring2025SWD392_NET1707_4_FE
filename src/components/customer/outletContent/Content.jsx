import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Content.css";

const Content = () => {
  const [sortType, setSortType] = useState("default");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: "Deep Cleansing Facial",
      category_id: 1,
      gap_day: 7,
      price: 500000,
      image: "/images/deep-cleansing.jpg",
    },
    {
      id: 2,
      name: "Hydrating Facial",
      category_id: 1,
      gap_day: 10,
      price: 600000,
      image: "/images/hydrating.jpg",
    },
    {
      id: 3,
      name: "Anti-Acne Facial",
      category_id: 1,
      gap_day: 14,
      price: 550000,
      image: "/images/anti-acne.jpg",
    },
    {
      id: 4,
      name: "Body Scrub",
      category_id: 2,
      gap_day: 7,
      price: 400000,
      image: "/images/body-scrub.jpg",
    },
    {
      id: 5,
      name: "Aromatherapy Massage",
      category_id: 2,
      gap_day: 14,
      price: 700000,
      image: "/images/aromatherapy.jpg",
    },
    {
      id: 6,
      name: "Slimming Treatment",
      category_id: 2,
      gap_day: 21,
      price: 800000,
      image: "/images/slimming.jpg",
    },
    {
      id: 7,
      name: "Hair Strengthening",
      category_id: 3,
      gap_day: 14,
      price: 650000,
      image: "/images/hair-strengthening.jpg",
    },
    {
      id: 8,
      name: "Dandruff Treatment",
      category_id: 3,
      gap_day: 10,
      price: 450000,
      image: "/images/dandruff-treatment.jpg",
    },
    {
      id: 9,
      name: "Scalp Detox",
      category_id: 3,
      gap_day: 7,
      price: 480000,
      image: "/images/scalp-detox.jpg",
    },
  ];

  const getFilteredServices = () => {
    let filtered = [...services];

    const selectedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];
    if (selectedCategories.length) {
      filtered = filtered.filter((service) =>
        selectedCategories.includes(service.category_id)
      );
    }

    const selectedPriceRanges =
      JSON.parse(localStorage.getItem("selectedPriceRanges")) || [];
    if (selectedPriceRanges.length) {
      filtered = filtered.filter((service) =>
        selectedPriceRanges.some(
          (range) => service.price >= range.min && service.price <= range.max
        )
      );
    }
    return filtered;
  };

  const handleServiceClick = (service) => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    navigate("/customer-service/service-details");
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
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
        <span className="sort-label">Xếp theo:</span>
        <div className="sort-buttons">
          <button
            className={`sort-button ${sortType === "default" ? "active" : ""}`}
            onClick={() => setSortType("default")}
          >
            Mặc định
          </button>
          <button
            className={`sort-button ${sortType === "nameAZ" ? "active" : ""}`}
            onClick={() => setSortType("nameAZ")}
          >
            Tên A-Z
          </button>
          <button
            className={`sort-button ${sortType === "nameZA" ? "active" : ""}`}
            onClick={() => setSortType("nameZA")}
          >
            Tên Z-A
          </button>
          <button
            className={`sort-button ${
              sortType === "priceLowHigh" ? "active" : ""
            }`}
            onClick={() => setSortType("priceLowHigh")}
          >
            Giá thấp đến cao
          </button>
          <button
            className={`sort-button ${
              sortType === "priceHighLow" ? "active" : ""
            }`}
            onClick={() => setSortType("priceHighLow")}
          >
            Giá cao xuống thấp
          </button>
        </div>
      </div>

      <div className="services-grid">
        {currentServices.map((service) => (
          <div
            key={service.id}
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
              <h3 className="service-title">Dịch vụ: {service.name}</h3>
              <p className="service-price">{formatPrice(service.price)}₫</p>
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
