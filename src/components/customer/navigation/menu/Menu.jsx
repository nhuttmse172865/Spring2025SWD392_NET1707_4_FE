
import React, { useState } from "react";
import "./Menu.css";

const Menu = () => {

  const [openCategories, setOpenCategories] = useState(() => {
    const savedCategories = JSON.parse(localStorage.getItem("selectedCategories")) || [];
    return savedCategories.reduce((acc, id) => ({ ...acc, [id]: true }), {});
  });

  const [selectedPriceRanges, setSelectedPriceRanges] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedPriceRanges")) || [];
  });


  const toggleCategory = (categoryId) => {
    let selectedCategories = JSON.parse(localStorage.getItem("selectedCategories")) || [];

    if (selectedCategories.includes(categoryId)) {
      selectedCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      selectedCategories.push(categoryId);
    }
    localStorage.setItem("selectedCategories", JSON.stringify(selectedCategories));

    setOpenCategories(
      selectedCategories.reduce((acc, id) => ({ ...acc, [id]: true }), {})
    );
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
  
    setSelectedPriceRanges(updatedSelections);
    localStorage.setItem("selectedPriceRanges", JSON.stringify(updatedSelections));
    window.location.reload();
  };
  




  const categories = [
    { id: 1, name: "Facial Treatment" },
    { id: 2, name: "Body Care" },
    { id: 3, name: "Hair Treatment" },
    { id: 4, name: "Acne Treatment" },
    { id: 5, name: "Anti-Aging" },
    { id: 6, name: "Laser Therapy" },
  ];

  const services = [
    { id: 1, name: 'Deep Cleansing Facial', category_id: 1, gap_day: 7, price: 500000, image: '/images/deep-cleansing.jpg' },
    { id: 2, name: 'Hydrating Facial', category_id: 1, gap_day: 10, price: 600000, image: '/images/hydrating.jpg' },
    { id: 3, name: 'Anti-Acne Facial', category_id: 1, gap_day: 14, price: 550000, image: '/images/anti-acne.jpg' },
    { id: 4, name: 'Body Scrub', category_id: 2, gap_day: 7, price: 400000, image: '/images/body-scrub.jpg' },
    { id: 5, name: 'Aromatherapy Massage', category_id: 2, gap_day: 14, price: 700000, image: '/images/aromatherapy.jpg' },
    { id: 6, name: 'Slimming Treatment', category_id: 2, gap_day: 21, price: 800000, image: '/images/slimming.jpg' },
    { id: 7, name: 'Hair Strengthening', category_id: 3, gap_day: 14, price: 650000, image: '/images/hair-strengthening.jpg' },
    { id: 8, name: 'Dandruff Treatment', category_id: 3, gap_day: 10, price: 450000, image: '/images/dandruff-treatment.jpg' },
    { id: 9, name: 'Scalp Detox', category_id: 3, gap_day: 7, price: 480000, image: '/images/scalp-detox.jpg' }
  ];

  const priceRanges = [
    { id: 1, label: "Dưới 500.000đ", min: 0, max: 500000 },
    { id: 2, label: "Từ 500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
    { id: 3, label: "Từ 1.000.000đ - 2.000.000đ", min: 1000000, max: 2000000 },
    { id: 4, label: "Từ 2.000.000đ - 3.000.000đ", min: 2000000, max: 3000000 },
    { id: 5, label: "Trên 3.000.000đ", min: 3000000, max: Infinity },
  ];


  const skinTypes = [
    { id: 1, name: "Oily" },
    { id: 2, name: "Dry" },
    { id: 3, name: "Combination" },
    { id: 4, name: "Sensitive" },
  ];

  return (
    <div className="sidebar-filter">

      <div className="filter-section">
        <div className="section-title">DANH MỤC DỊCH VỤ</div>
        <div className="services-container">
          {categories.map((category) => (
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
              <div className={`subservices ${openCategories[category.id] ? "open" : ""}`}>
                {services.filter((service) => service.category_id === category.id)
                  .map((service) => (
                    <div key={service.id} className="service-item">
                      <input type="checkbox" id={`service-${service.id}`} />
                      <label htmlFor={`service-${service.id}`}>{service.name}</label>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="sidebar-filter">
        <div className="filter-section">
          <div className="section-title">CHỌN MỨC GIÁ</div>
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
              <label htmlFor={`price-${range.min}-${range.max}`}>{range.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <div className="section-title">LOẠI DA</div>
        {skinTypes.map((type) => (
          <div key={type.id} className="filter-item">
            <input type="checkbox" id={`skin-${type.id}`} />
            <label htmlFor={`skin-${type.id}`}>{type.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;