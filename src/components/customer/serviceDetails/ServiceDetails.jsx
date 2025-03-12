import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../../../constants/base";
import "./ServiceDetails.css";

const ServiceDetails = React.memo(() => {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDetail, setServiceDetail] = useState([]);
  const [serviceSteps, setServiceSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const storedService = JSON.parse(
          localStorage.getItem("selectedService")
        );

        if (!storedService?.id) {
          setLoading(false);
          return;
        }

        setSelectedService(storedService);
        const detailResponse = await axios.get(
          `${BASE.BASE_URL}/service-detail/getByServiceId?id=${storedService.id}`
        );
        const details = detailResponse.data.data || [];
        setServiceDetail(details);

        if (details.length > 0) {
          const stepPromises = details.map((detail) =>
            axios
              .get(
                `${BASE.BASE_URL}/service-detail-step/getByServiceDetailId?id=${detail.id}`
              )
              .then((response) => ({
                detailId: detail.id,
                steps: response.data.data || [],
              }))
          );

          const stepsData = await Promise.all(stepPromises);
          setServiceSteps(stepsData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching service data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const formatPrice = useCallback((price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const getStepsForDetail = useMemo(() => {
    return (detailId) =>
      serviceSteps.find((item) => item.detailId === detailId)?.steps || [];
  }, [serviceSteps]);

  if (loading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (!selectedService) {
    return <p className="text-center text-red-500">No service selected.</p>;
  }

  return (
    <div className="service-details-container">
      <button className="back-button" onClick={handleBack}>
        <ArrowLeft size={20} />
      </button>

      <h4 className="service-title0">{selectedService.name}</h4>
      <img
        src={selectedService.image}
        alt={selectedService.name}
        className="service-image"
        loading="lazy"
      />
      <p className="service-price">
        Price: {formatPrice(selectedService.total)}
      </p>
      <p className="service-gap">
        Interval between uses: {selectedService.gapDay} day
      </p>

      {serviceDetail.length > 0 ? (
        <div className="service-details-list">
          <h4 className="service-details-title">Service Details</h4>
          {serviceDetail.map((detail) => {
            const stepsData = getStepsForDetail(detail.id);

            return (
              <div key={detail.id} className="service-detail-card">
                <img
                  src={detail.image}
                  alt={detail.name}
                  className="service-detail-image"
                  loading="lazy"
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
        <p className="no-service-details">No Service Details Available.</p>
      )}
    </div>
  );
});

export default ServiceDetails;
