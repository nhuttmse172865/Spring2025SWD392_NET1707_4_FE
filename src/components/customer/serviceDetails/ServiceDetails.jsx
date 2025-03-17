

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
        let serviceId;

        if (storedService?.id) {
          console.log("Using storedService from localStorage:", storedService);
          serviceId = storedService.id;
          setSelectedService({
            ...storedService,
            image:
              storedService.image?.[0]?.url ||
              "https://via.placeholder.com/300",
          });
        } else {
          serviceId = localStorage.getItem("selectedServiceId");

          if (!serviceId) {
            setLoading(false);
            console.error("No service data or ID found in localStorage");
            return;
          }

          const serviceResponse = await axios.get(
            `${BASE.BASE_URL}/service/getById?id=${serviceId}`
          );
          const serviceData = serviceResponse.data.data;
          console.log("Fetched service data from API:", serviceData);
          if (!serviceData) {
            throw new Error("Service not found");
          }
          setSelectedService({
            ...serviceData,
            image:
              serviceData.images?.[0]?.url || "https://via.placeholder.com/300",
          });
          serviceId = serviceData.id;
        }

    
        const serviceResponse = await axios.get(
          `${BASE.BASE_URL}/service/getById?id=${serviceId}`
        );
        const serviceData = serviceResponse.data.data;
        const details = serviceData.service_details || [];
        console.log("Service details from API:", details);
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
          console.log("Service steps:", stepsData);
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
    if (typeof price !== "number") {
      return "N/A";
    }
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }, []);

  const handleBack = useCallback(() => {
    localStorage.removeItem("selectedService");
    localStorage.removeItem("selectedServiceId");
    navigate("/customer-service");
  }, [navigate]);

  const getStepsForDetail = useMemo(() => {
    return (detailId) =>
      serviceSteps.find((item) => item.detailId === detailId)?.steps || [];
  }, [serviceSteps]);

  const totalPrice = useMemo(() => {
    return serviceDetail.reduce((sum, detail) => {
      return sum + (detail.price || 0);
    }, selectedService?.total || 0); 
  }, [serviceDetail, selectedService]);

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

      <h4 className="service-title0">
        {selectedService.name || "Unnamed Service"}
      </h4>
      <img
        src={selectedService.image || "https://via.placeholder.com/300"}
        alt={selectedService.name || "Service"}
        className="service-image"
        loading="lazy"
      />
      <p className="service-price">Price: {formatPrice(totalPrice)}</p>
      <p className="service-gap">
        Interval between uses: {selectedService.gapDay || "N/A"} day
      </p>

      {serviceDetail.length > 0 ? (
        <div className="service-details-list">
          <h4 className="service-details-title">Service Details</h4>
          {serviceDetail.map((detail) => {
            const stepsData = getStepsForDetail(detail.id);

            return (
              <div key={detail.id} className="service-detail-card">
                <img
                  src={
                    detail.images?.[0]?.url || "https://via.placeholder.com/150"
                  }
                  alt={detail.name || "Detail"}
                  className="service-detail-image"
                  loading="lazy"
                />
                <div className="service-detail-info">
                  <p className="detail-name">
                    {detail.name || "Unnamed Detail"}
                  </p>
                  <p className="detail-day">Day: {detail.dayOrder || "N/A"}</p>
                  <p className="detail-duration">
                    Time: {detail.duration || "N/A"} hour(s)
                  </p>
                  <p className="detail-description">
                    Description:{" "}
                    {detail.description || "No description available"}
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
                          <strong>{step.stepNumber}:</strong>{" "}
                          {step.name || "Unnamed Step"}
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
