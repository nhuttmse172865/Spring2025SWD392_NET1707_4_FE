
import React, { useState, useEffect } from "react";
import "./Menu.css";
import axios from "axios";
import BASE from "../../../../constants/base";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const Menu = () => {
  const [openCategories, setOpenCategories] = useState(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];
    return savedCategories.length > 0
      ? savedCategories.reduce((acc, id) => ({ ...acc, [id]: true }), {})
      : {};
  });

  const [selectedPriceRanges, setSelectedPriceRanges] = useState(() => {
    const savedPriceRanges =
      JSON.parse(localStorage.getItem("selectedPriceRanges")) || [];
    return savedPriceRanges.length > 0 ? savedPriceRanges : [];
  });

  const [selectedSkinTypes, setSelectedSkinTypes] = useState(() => {
    const savedSkinTypes =
      JSON.parse(localStorage.getItem("selectedSkinTypes")) || [];
    return savedSkinTypes.length > 0 ? savedSkinTypes : [];
  });

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE.BASE_URL}/category/getAll`);
        if (response.data.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
        );
        if (response.data.data && Array.isArray(response.data.data)) {
          setServices(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    const fetchSkinTypes = async () => {
      try {
        const response = await axios.get(`${BASE.BASE_URL}/skinType/getAll`, {
          headers: { accept: "*/*" },
        });
        if (response.data.data && Array.isArray(response.data.data)) {
          setSkinTypes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching skin types:", error);
      }
    };

    fetchCategories();
    fetchServices();
    fetchSkinTypes();

    // Kiểm tra và xóa nếu localStorage rỗng
    if (
      JSON.parse(localStorage.getItem("selectedCategories"))?.length === 0 ||
      !localStorage.getItem("selectedCategories")
    ) {
      localStorage.removeItem("selectedCategories");
      setOpenCategories({});
    }
    if (
      JSON.parse(localStorage.getItem("selectedPriceRanges"))?.length === 0 ||
      !localStorage.getItem("selectedPriceRanges")
    ) {
      localStorage.removeItem("selectedPriceRanges");
      setSelectedPriceRanges([]);
    }
    if (
      JSON.parse(localStorage.getItem("selectedSkinTypes"))?.length === 0 ||
      !localStorage.getItem("selectedSkinTypes")
    ) {
      localStorage.removeItem("selectedSkinTypes");
      setSelectedSkinTypes([]);
    }
  }, []);

  const toggleCategory = (categoryId) => {
    let selectedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];

    if (selectedCategories.includes(categoryId)) {
      selectedCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      selectedCategories.push(categoryId);
    }

    if (selectedCategories.length === 0) {
      localStorage.removeItem("selectedCategories");
      setOpenCategories({});
    } else {
      localStorage.setItem(
        "selectedCategories",
        JSON.stringify(selectedCategories)
      );
      setOpenCategories(
        selectedCategories.reduce((acc, id) => ({ ...acc, [id]: true }), {})
      );
    }
    window.location.reload();
  };

  const handlePriceRangeChange = (range) => {
    const updatedSelections = selectedPriceRanges.some(
      (item) => item.min === range.min && item.max === range.max
    )
      ? selectedPriceRanges.filter(
          (item) => item.min !== range.min || item.max !== range.max
        )
      : [...selectedPriceRanges, range];

    if (updatedSelections.length === 0) {
      localStorage.removeItem("selectedPriceRanges");
    } else {
      localStorage.setItem(
        "selectedPriceRanges",
        JSON.stringify(updatedSelections)
      );
    }

    setSelectedPriceRanges(updatedSelections);
    window.location.reload();
  };

  const handleSkinTypeChange = (skinTypeName) => {
    const updatedSelections = selectedSkinTypes.includes(skinTypeName)
      ? selectedSkinTypes.filter((name) => name !== skinTypeName)
      : [...selectedSkinTypes, skinTypeName];

    if (updatedSelections.length === 0) {
      localStorage.removeItem("selectedSkinTypes");
    } else {
      localStorage.setItem(
        "selectedSkinTypes",
        JSON.stringify(updatedSelections)
      );
    }

    setSelectedSkinTypes(updatedSelections);
    window.location.reload();
  };

  const priceRanges = [
    { id: 1, label: "Under $50", min: 10, max: 50 },
    { id: 2, label: "$50 - $100", min: 50, max: 100 },
    { id: 3, label: "$100 - $200", min: 100, max: 200 },
    { id: 4, label: "$200 - $300", min: 200, max: 300 },
    { id: 5, label: "Above $300", min: 300, max: Infinity },
  ];

  return (
    <div className="sidebar-filter">
      <div className="filter-section">
        <div className="section-title">Service Categories</div>
        <div className="services-container">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <div key={category.id} className="service-category">
                <div
                  className="service-header"
                  onClick={() => toggleCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="toggle-icon">
                    {openCategories[category.id] ? "-" : "+"}
                  </span>
                </div>
                <div
                  className={`subservices ${
                    openCategories[category.id] ? "open" : ""
                  }`}
                >
                  {services
                    .filter((service) => service.categoryId === category.id)
                    .map((service) => (
                      <div key={service.name} className="service-item">
                        <input type="checkbox" id={`service-${service.name}`} />
                        <label htmlFor={`service-${service.name}`}>
                          {service.name}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="section-title">Select Skin Type</div>
        {Array.isArray(skinTypes) &&
          skinTypes.map((skinType) => (
            <div key={skinType.id} className="filter-item">
              <input
                type="checkbox"
                id={`skin-${skinType.id}`}
                checked={selectedSkinTypes.includes(skinType.name)}
                onChange={() => handleSkinTypeChange(skinType.name)}
              />
              <label htmlFor={`skin-${skinType.id}`}>
                {skinType.name || `Skin Type ${skinType.id}`}
              </label>
            </div>
          ))}
      </div>

      <div className="filter-section">
        <div className="section-title">Select Price Range</div>
        {priceRanges.map((range) => (
          <div key={range.label} className="filter-item">
            <input
              type="checkbox"
              id={`price-${range.min}-${range.max}`}
              checked={selectedPriceRanges.some(
                (item) => item.min === range.min && item.max === range.max
              )}
              onChange={() => handlePriceRangeChange(range)}
            />
            <label htmlFor={`price-${range.min}-${range.max}`}>
              {formatPrice(range.min)} -{" "}
              {range.max !== Infinity ? formatPrice(range.max) : "Above $300"}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
