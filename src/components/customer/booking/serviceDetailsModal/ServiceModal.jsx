import React, { useEffect, useState } from "react";
import "./ServiceModal.css";
import axios from "axios";
import BASE from "../../../../constants/base";
import Authorization from "../../../../middleware/Authorization";

const ServiceModal = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDetails, setServiceDetails] = useState([]);

  useEffect(() => {
    const fetchServiceById = async () => {
      try {
        const primaryId = localStorage.getItem("selectedServiceId");
        const secondaryId = localStorage.getItem("selectedServiceID");

        let serviceId;
        if (primaryId && primaryId !== "undefined" && primaryId !== "null") {
          serviceId = Number(primaryId);
        } else if (
          secondaryId &&
          secondaryId !== "undefined" &&
          secondaryId !== "null"
        ) {
          serviceId = Number(secondaryId);
        } else {
          console.error("No valid service ID found in localStorage");
          return;
        }

        const response = await axios.get(
          `${BASE.BASE_URL}/service/getById?id=${serviceId}`
        );
        const serviceData = response.data.data;
        setSelectedService(serviceData);
        setServiceDetails(serviceData.service_details || []);
      } catch (error) {
        console.error("Error fetching service by ID:", error);
      }
    };

    fetchServiceById();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (!selectedService) {
    return <p className="text-center text-red-500">No service is selected.</p>;
  }

  return (
    <Authorization requiredRole={ROLES.CUSTOMER}>
      <div className="service-details-container1">
        {serviceDetails.length > 0 ? (
          <div className="service-details-list">
            {serviceDetails.map((detail) => (
              <div key={detail.id} className="service-detail-card">
                {detail.images && detail.images.length > 0 ? (
                  <img
                    src={detail.images[0].url}
                    alt={detail.name}
                    className="service-detail-image"
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div className="service-detail-info">
                  <p className="detail-name">{detail.name}</p>
                  <p className="detail-day">Day: {detail.dayOrder}</p>
                  <p className="detail-duration">
                    Time: {detail.duration * 60} minutes
                  </p>
                  <p className="detail-description">
                    Description: {detail.description}
                  </p>
                  <p className="detail-price">
                    Price: {formatPrice(detail.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-service-details">No Service Details.</p>
        )}
      </div>
    </Authorization>
  );
};

export default ServiceModal;
