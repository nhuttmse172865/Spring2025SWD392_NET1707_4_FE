import React from "react";
import "./ServiceDetails.css"; // Import file CSS nếu cần

const ServiceDetails = () => {
  const service = JSON.parse(localStorage.getItem("selectedService"));

  const serviceDetails = [
    {
      id: 1,
      day: "Day 1",
      duration: 60,
      description: "Cleansing and exfoliation",
      price: 50,
      name: "Cleanse",
      service_id: 1,
      image: "https://via.placeholder.com/300x200?text=Cleanse",
    },
    {
      id: 2,
      day: "Day 2",
      duration: 45,
      description: "Mask application",
      price: 30,
      name: "Mask",
      service_id: 1,
      image: "https://via.placeholder.com/300x200?text=Mask",
    },
    {
      id: 3,
      day: "2024-02-03",
      duration: 30,
      description: "Moisturizing",
      price: 20,
      name: "Moisturize",
      service_id: 2,
      image: "https://via.placeholder.com/300x200?text=Moisturize",
    },
  ];

  const serviceSteps = [
    {
      id: 1,
      service_detail_id: 1,
      name: "Step 1",
      description: "Wash face with gentle cleanser",
    },
    {
      id: 2,
      service_detail_id: 1,
      name: "Step 2",
      description: "Apply exfoliating scrub",
    },
    {
      id: 3,
      service_detail_id: 2,
      name: "Step 1",
      description: "Apply hydrating mask",
    },
  ];

  if (!service) {
    return (
      <p className="text-center text-red-500">
        Không có dịch vụ nào được chọn.
      </p>
    );
  }

  const filteredDetails = serviceDetails.filter(
    (detail) => detail.service_id === service.id
  );

  return (
    <div className="service-details-container">
      <h4 className="service-title0">{service.name}</h4>
      <img src={service.image} alt={service.name} className="service-image" />
      <p className="service-price">Price: {service.price.toLocaleString()}₫</p>
      <p className="service-gap">
        Interval between uses: {service.gap_day} day
      </p>

      {filteredDetails.length > 0 ? (
        <div className="service-details-list">
          <h4 className="service-details-title">Services Details</h4>
          {filteredDetails.map((detail) => {
            const steps = serviceSteps.filter(
              (step) => step.service_detail_id === detail.id
            );
            return (
              <div key={detail.id} className="service-detail-card">
                <img
                  src={detail.image}
                  alt={detail.name}
                  className="service-detail-image"
                />
                <div className="service-detail-info">
                  <p className="detail-name">{detail.name}</p>
                  <p className="detail-day">Day: {detail.day}</p>
                  <p className="detail-duration">
                    Time: {detail.duration} phút
                  </p>
                  <p className="detail-description"> Description :{detail.description}</p>
                  <p className="detail-price">
                    Price: {detail.price.toLocaleString()}₫
                  </p>
                </div>

                {steps.length > 0 && (
                  <div className="service-steps">
                    <h4 className="steps-title1">Implementation steps:</h4>
                    <ul className="steps-list">
                      {steps.map((step) => (
                        <li key={step.id}>
                          <strong>{step.name}:</strong> {step.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-service-details">Không có chi tiết dịch vụ nào.</p>
      )}
    </div>
  );
};

export default ServiceDetails;
