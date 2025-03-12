import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import BASE from "../../../constants/base";
import "./Content.css";

const Content = React.memo(() => {
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
        return [...filteredServices].sort((a, b) => a.price - b.price);
      case "priceHighLow":
        return [...filteredServices].sort((a, b) => b.price - a.price);
      default:
        return filteredServices;
    }
  }, [filteredServices, sortType]);

  const handleServiceClick = useCallback(
    (service) => {
      localStorage.setItem("selectedService", JSON.stringify(service));
      console.log(service);
      navigate("/customer-service/service-details");
    },
    [navigate]
  );

  const handleBookClick = useCallback(
    (id) => {
      localStorage.setItem("selectedServiceId", id);
      navigate("/booking");
    },
    [navigate]
  );

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  }, []);

  const servicesPerPage = 6;
  const pageCount = Math.ceil(sortedServices.length / servicesPerPage);
  const currentServices = useMemo(() => {
    const start = currentPage * servicesPerPage;
    const end = start + servicesPerPage;
    return sortedServices.slice(start, end);
  }, [sortedServices, currentPage]);

  const handlePageClick = useCallback((data) => {
    setCurrentPage(data.selected);
  }, []);

  return (
    <div className="spa-container">
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
                src={service.image}
                alt={service.name}
                className="service-image"
                loading="lazy"
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
});

export default Content;
