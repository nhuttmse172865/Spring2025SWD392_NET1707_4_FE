import React, { useState, useEffect } from "react";
import "./Price.css";

const Price = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedService, setExpandedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/category/getAll");
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
      try {
        const allServices = [];
        for (const category of categories) {
          const response = await fetch(
            `http://localhost:8080/service/getServicesByCategory?id=${category.id}`
          );
          const result = await response.json();
          if (result.status === 200) {
            const servicesWithDetails = await Promise.all(
              result.data.map(async (service) => {
                const detailResponse = await fetch(
                  `http://localhost:8080/service-detail/getByServiceId?id=${service.id}`
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
            allServices.push(...servicesWithDetails);
          }
        }
        setServices(allServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services or details:", error);
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchServicesAndDetails();
    }
  }, [categories]);

  const steps = [
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
  ];

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const toggleDetails = (serviceId) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  return (
    <div className="price-container">
      <div className="price-categories">
        {categories.map((category) => {
          const categoryServices = services.filter(
            (service) => service.categoryId === category.id
          );
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
                      <div className="service-price">
                        {formatPrice(service.price)}
                      </div>
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
                    <td>
                      <strong>{detail.name}</strong>
                    </td>
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
        <h1 className="timeline-title">
          Acne Treatment & Consultation Process at O2 SKIN
        </h1>
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
};

export default Price;
