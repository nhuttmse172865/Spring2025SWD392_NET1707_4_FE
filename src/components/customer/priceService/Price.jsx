
import React, { useState, useEffect, useMemo, useCallback } from "react";
import BASE from "../../../constants/base";
import "./Price.css";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

const Price = React.memo(() => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedService, setExpandedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE.BASE_URL}/category/getAll`);
        const result = await response.json();
        if (result.status === 200) {
          setCategories(result.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchServicesAndDetails = async () => {
      if (categories.length === 0) return;

      try {
        setLoading(true);
        const servicePromises = categories.map((category) =>
          fetch(
            `${BASE.BASE_URL}/service/getServicesByCategory?id=${category.id}`
          )
            .then((response) => response.json())
            .then(async (result) => {
              if (result.status !== 200) return [];
              const servicesWithDetails = await Promise.all(
                result.data.map(async (service) => {
                  const detailResponse = await fetch(
                    `${BASE.BASE_URL}/service-detail/getByServiceId?id=${service.id}`
                  );
                  const detailResult = await detailResponse.json();
                  const totalPrice =
                    detailResult.status === 200
                      ? detailResult.data.reduce(
                          (sum, detail) => sum + detail.price,
                          0
                        )
                      : 0;

                  return {
                    ...service,
                    price: totalPrice,
                    details: detailResult.status === 200 ? detailResult.data : [],
                  };
                })
              );
              return servicesWithDetails;
            })
        );

        const allServices = (await Promise.all(servicePromises)).flat();
        setServices(allServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services or details:", error);
        setLoading(false);
      }
    };

    fetchServicesAndDetails();
  }, [categories]);

  // Memoize steps (dữ liệu tĩnh)
  const steps = useMemo(
    () => [
      {
        number: "01",
        title: "Schedule an Appointment",
        icon: "📋",
        description:
          "To manage your time efficiently and avoid long waiting times, you can book an appointment in two ways:",
        bullets: [
          "Fill out the registration form on the website.",
          "Call the Hotline 1900 3147.",
        ],
      },
      {
        number: "02",
        title: "Consultation & Examination",
        icon: "👨‍⚕️",
        description:
          "A dermatologist will examine your skin and conduct a skin analysis. Based on scientific assessment and your skin condition, the doctor will develop a suitable treatment plan.",
      },
      {
        number: "03",
        title: "Payment Process",
        icon: "💳",
        description:
          "Once you agree with the doctor's treatment plan, a consultant will provide detailed information again, and you can proceed with the payment.",
      },
      {
        number: "04",
        title: "Treatment Procedure",
        icon: "🏥",
        description:
          "You will be guided to the skincare treatment room to undergo the acne treatment process. For certain procedures, the doctor will perform the treatment directly.",
      },
      {
        number: "05",
        title: "Post-Treatment Care",
        icon: "👩‍⚕️",
        description:
          "At O2 SKIN, post-treatment care is a priority. You will receive detailed guidance on how to care for and protect your skin at home to prevent recurrence. Additionally, O2 SKIN is always available to answer any questions, even after your treatment is complete.",
      },
      {
        number: "06",
        title: "Follow-Up & Completion",
        icon: "🏣",
        description:
          "It's important to attend follow-up appointments as scheduled so that the doctor can monitor your progress closely and make any necessary adjustments to ensure optimal results.",
      },
    ],
    []
  );

  // Memoize handlers
  const toggleDetails = useCallback((serviceId) => {
    setExpandedService((prev) => (prev === serviceId ? null : serviceId));
  }, []);

  const handleShowModal = useCallback((service) => {
    setSelectedService(service);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedService(null);
  }, []);

  // Memoize category services
  const getCategoryServices = useMemo(() => {
    return (categoryId) => services.filter((service) => service.categoryId === categoryId);
  }, [services]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="price-container">
      <div className="price-categories">
        {categories.map((category) => {
          const categoryServices = getCategoryServices(category.id);
          if (categoryServices.length === 0) return null;

          return (
            <div key={category.id} className="category-card">
              <h2 className="category-title">{category.name}</h2>
              <div className="service-table">
                <div className="table-header">
                  <div className="header-cell1">Treatment Service</div>
                  <div className="header-cell">Service Price</div>
                </div>
                <div className="service-list">
                  {categoryServices.map((service) => (
                    <div
                      key={service.id}
                      className="service-item"
                      onClick={() => handleShowModal(service)}
                    >
                      <div className="service-name">{service.name}</div>
                      <div className="service-price1">{formatPrice(service.price)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Popup */}
      {showModal && selectedService && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <table className="service-details-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {selectedService.details.map((detail) => (
                  <tr key={detail.id}>
                    <td><strong>{detail.name}</strong></td>
                    <td>{formatPrice(detail.price)}</td>
                    <td>{detail.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="treatment-timeline">
        <h1 className="timeline-title">Acne Treatment & Consultation Process at O2 SKIN</h1>
        <div className="timeline-container">
          {steps.map((step, index) => (
            <div key={index} className="timeline-step">
              <div className="step-number">
                <div className="number">{step.number}</div>
              </div>
              <div className="step-icon">
                <span className="icon">{step.icon}</span>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {step.bullets && (
                  <ul>
                    {step.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Price;