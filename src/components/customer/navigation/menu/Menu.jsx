// import React, { useState, useEffect } from "react";
// import "./Menu.css";
// import axios from "axios";
// import BASE from "../../../../constants/base";

// const Menu = () => {
//   const [openCategories, setOpenCategories] = useState(() => {
//     const savedCategories =
//       JSON.parse(localStorage.getItem("selectedCategories")) || [];
//     return savedCategories.reduce((acc, id) => ({ ...acc, [id]: true }), {});
//   });

//   const [selectedPriceRanges, setSelectedPriceRanges] = useState(() => {
//     return JSON.parse(localStorage.getItem("selectedPriceRanges")) || [];
//   });

//   const [categories, setCategories] = useState([]);
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(`${BASE.BASE_URL}/category/getAll`);
//         if (response.data.data && Array.isArray(response.data.data)) {
//           setCategories(response.data.data);
//         } else {
//           console.error(
//             "Categories data is not an array or is missing:",
//             response.data
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
//         );
//         if (response.data.data && Array.isArray(response.data.data)) {
//           setServices(response.data.data);
//         } else {
//           console.error(
//             "Services data is not an array or is missing:",
//             response.data
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchCategories();
//     fetchServices();
//   }, []);

//   const toggleCategory = (categoryId) => {
//     let selectedCategories =
//       JSON.parse(localStorage.getItem("selectedCategories")) || [];

//     if (selectedCategories.includes(categoryId)) {
//       selectedCategories = selectedCategories.filter((id) => id !== categoryId);
//     } else {
//       selectedCategories.push(categoryId);
//     }
//     localStorage.setItem(
//       "selectedCategories",
//       JSON.stringify(selectedCategories)
//     );

//     setOpenCategories(
//       selectedCategories.reduce((acc, id) => ({ ...acc, [id]: true }), {})
//     );
//     window.location.reload();
//   };

//   const handlePriceRangeChange = (range) => {
//     const updatedSelections = selectedPriceRanges.some(
//       (item) => item.min === range.min && item.max === range.max
//     )
//       ? selectedPriceRanges.filter(
//           (item) => item.min !== range.min || item.max !== range.max
//         )
//       : [...selectedPriceRanges, range];

//     setSelectedPriceRanges(updatedSelections);
//     localStorage.setItem(
//       "selectedPriceRanges",
//       JSON.stringify(updatedSelections)
//     );
//     window.location.reload();
//   };

//   const priceRanges = [
//     { id: 1, label: "Dưới 500.000đ", min: 0, max: 500000 },
//     { id: 2, label: "Từ 500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
//     { id: 3, label: "Từ 1.000.000đ - 2.000.000đ", min: 1000000, max: 2000000 },
//     { id: 4, label: "Từ 2.000.000đ - 3.000.000đ", min: 2000000, max: 3000000 },
//     { id: 5, label: "Trên 3.000.000đ", min: 3000000, max: Infinity },
//   ];

//   const skinTypes = [
//     { id: 1, name: "Oily" },
//     { id: 2, name: "Dry" },
//     { id: 3, name: "Combination" },
//     { id: 4, name: "Sensitive" },
//   ];

//   return (
//     <div className="sidebar-filter">
//       <div className="filter-section">
//         <div className="section-title">SERVICE CATEGORIES</div>
//         <div className="services-container">
//           {Array.isArray(categories) &&
//             categories.map((category) => (
//               <div key={category.id} className="service-category">
//                 <div
//                   className="service-header"
//                   onClick={() => toggleCategory(category.id)}
//                 >
//                   <span>{category.name}</span>
//                   <span className="toggle-icon">
//                     {openCategories[category.id] ? "-" : "+"}
//                   </span>
//                 </div>
//                 <div
//                   className={`subservices ${
//                     openCategories[category.id] ? "open" : ""
//                   }`}
//                 >
//                   {services
//                     .filter((service) => service.categoryId === category.id)
//                     .map((service) => (
//                       <div key={service.name} className="service-item">
//                         <input type="checkbox" id={`service-${service.name}`} />
//                         <label htmlFor={`service-${service.name}`}>
//                           {service.name}
//                         </label>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div className="sidebar-filter">
//         <div className="filter-section">
//           <div className="section-title">SELECT PRICE RANGE</div>
//           {priceRanges.map((range) => (
//             <div key={range.label} className="filter-item">
//               <input
//                 type="checkbox"
//                 id={`price-${range.min}-${range.max}`}
//                 checked={selectedPriceRanges.some(
//                   (item) => item.min === range.min && item.max === range.max
//                 )}
//                 onChange={() => handlePriceRangeChange(range)}
//               />
//               <label htmlFor={`price-${range.min}-${range.max}`}>
//                 {range.label}
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="filter-section">
//         <div className="section-title">SKIN TYPE</div>
//         {skinTypes.map((type) => (
//           <div key={type.id} className="filter-item">
//             <input type="checkbox" id={`skin-${type.id}`} />
//             <label htmlFor={`skin-${type.id}`}>{type.name}</label>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Menu;

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
    return savedCategories.reduce((acc, id) => ({ ...acc, [id]: true }), {});
  });

  const [selectedPriceRanges, setSelectedPriceRanges] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedPriceRanges")) || [];
  });

  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE.BASE_URL}/category/getAll`);
        if (response.data.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error(
            "Categories data is not an array or is missing:",
            response.data
          );
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
        } else {
          console.error(
            "Services data is not an array or is missing:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCategories();
    fetchServices();
  }, []);

  const toggleCategory = (categoryId) => {
    let selectedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];

    if (selectedCategories.includes(categoryId)) {
      selectedCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      selectedCategories.push(categoryId);
    }
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );

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
    localStorage.setItem(
      "selectedPriceRanges",
      JSON.stringify(updatedSelections)
    );
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
