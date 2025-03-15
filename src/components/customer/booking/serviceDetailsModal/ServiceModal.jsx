import React, { useEffect, useState } from "react";
import "./ServiceModal.css";
import axios from "axios";
import BASE from "../../../../constants/base";

const ServiceModal = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [serviceSteps, setServiceSteps] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
        );
        const storedServiceId = Number(
          localStorage.getItem("selectedServiceID")
        );
        const matchedService = response.data.data.find(
          (service) => service.id === storedServiceId
        );
        if (matchedService) {
          setSelectedService(matchedService);
          // Fetch service details
          const serviceDetailResponse = await axios.get(
            `${BASE.BASE_URL}/service-detail/getByServiceId?id=${storedServiceId}`
          );
          setServiceDetail(serviceDetailResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (serviceDetail && serviceDetail.length > 0) {
      serviceDetail.forEach((detail) => {
        axios
          .get(
            `${BASE.BASE_URL}/service-detail-step/getByServiceDetailId?id=${detail.id}`
          )
          .then((response) => {
            setServiceSteps((prevSteps) => [
              ...prevSteps,
              { detailId: detail.id, steps: response.data.data },
            ]);
          })
          .catch((error) => {
            console.error("Error fetching service steps:", error);
          });
      });
    }
  }, [serviceDetail]);

  // Hàm định dạng giá theo USD
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
    <div className="service-details-container1">
      {serviceDetail && serviceDetail.length > 0 ? (
        <div className="service-details-list">
          {serviceDetail.map((detail) => {
            const stepsData =
              serviceSteps.find((item) => item.detailId === detail.id)?.steps ||
              [];

            return (
              <div key={detail.id} className="service-detail-card">
                <img
                  src={detail.image}
                  alt={detail.name}
                  className="service-detail-image"
                />
                <div className="service-detail-info">
                  <p className="detail-name">{detail.name}</p>
                  <p className="detail-day">Day: {detail.day_order}</p>
                  <p className="detail-duration">
                    Time: {detail.duration} minutes
                  </p>
                  <p className="detail-description">
                    Description: {detail.description}
                  </p>
                  <p className="detail-price">
                    Price: {formatPrice(detail.price)}
                  </p>
                </div>

                {stepsData.length > 0 && (
                  <div className="service-steps">
                    <h4 className="steps-title1">Implementation steps:</h4>
                    <ul className="steps-list">
                      {stepsData.map((step) => (
                        <li key={step.id}>
                          <strong>{step.stepNumber}:</strong> {step.name}
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
        <p className="no-service-details">No Service Details.</p>
      )}
    </div>
  );
};

export default ServiceModal;
