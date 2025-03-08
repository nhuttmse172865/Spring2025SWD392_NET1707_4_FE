// import React, { useEffect, useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import BASE from "../../../constants/base";
// import "./ServiceDetails.css";

// const ServiceDetails = () => {
//   const [selectedService, setSelectedService] = useState(null);
//   const [serviceDetail, setServiceDetail] = useState(null);
//   const [serviceSteps, setServiceSteps] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
//         );
//         setSelectedService(
//           JSON.parse(localStorage.getItem("selectedService")) || null
//         );
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };

//     fetchServices();
//   }, []);

//   useEffect(() => {
//     const storedService = JSON.parse(localStorage.getItem("selectedService"));

//     if (storedService?.id) {
//       const serviceId = storedService.id;
//       axios
//         .get(`${BASE.BASE_URL}/service-detail/getByServiceId?id=${serviceId}`)
//         .then((response) => {
//           setServiceDetail(response.data.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching service details:", error);
//         });
//     }
//   }, []);

//   useEffect(() => {
//     if (serviceDetail && serviceDetail.length > 0) {
//       serviceDetail.forEach((detail) => {
//         axios
//           .get(
//             `${BASE.BASE_URL}/service-detail-step/getByServiceDetailId?id=${detail.id}`
//           )
//           .then((response) => {
//             setServiceSteps((prevSteps) => [
//               ...prevSteps,
//               { detailId: detail.id, steps: response.data.data },
//             ]);
//           })
//           .catch((error) => {
//             console.error("Error fetching service steps:", error);
//           });
//       });
//     }
//   }, [serviceDetail]);

//   if (!selectedService) {
//     return <p className="text-center text-red-500">No service is selected.</p>;
//   }

//   return (
//     <div className="service-details-container">
//       <button className="back-button" onClick={() => navigate(-1)}>
//         <ArrowLeft size={20} />
//       </button>

//       <h4 className="service-title">{selectedService.name}</h4>
//       <img
//         src={selectedService.image}
//         alt={selectedService.name}
//         className="service-image"
//       />
//       <p className="service-price">
//         Price: {selectedService.total.toLocaleString()}
//       </p>
//       <p className="service-gap">
//         Interval between uses: {selectedService.gapDay} day
//       </p>

//       {serviceDetail && serviceDetail.length > 0 ? (
//         <div className="service-details-list">
//           <h4 className="service-details-title">Service Details</h4>
//           {serviceDetail.map((detail) => {
//             const stepsData =
//               serviceSteps.find((item) => item.detailId === detail.id)?.steps ||
//               [];

//             return (
//               <div key={detail.id} className="service-detail-card">
//                 <img
//                   src={detail.image}
//                   alt={detail.name}
//                   className="service-detail-image"
//                 />
//                 <div className="service-detail-info">
//                   <p className="detail-name">{detail.name}</p>
//                   <p className="detail-day">Day: {detail.day_order}</p>
//                   <p className="detail-duration">
//                     Time: {detail.duration} minutes
//                   </p>
//                   <p className="detail-description">
//                     Description: {detail.description}
//                   </p>
//                   <p className="detail-price">
//                     Price: {detail.price.toLocaleString()}
//                   </p>
//                 </div>

//                 {stepsData.length > 0 && (
//                   <div className="service-steps">
//                     <h4 className="steps-title1">Implementation steps:</h4>
//                     <ul className="steps-list">
//                       {stepsData.map((step) => (
//                         <li key={step.id}>
//                           <strong>{step.stepNumber}:</strong> {step.name}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="no-service-details">No have Service Details.</p>
//       )}
//     </div>
//   );
// };

// export default ServiceDetails;

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../../../constants/base";
import "./ServiceDetails.css";

const ServiceDetails = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [serviceSteps, setServiceSteps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
        );
        setSelectedService(
          JSON.parse(localStorage.getItem("selectedService")) || null
        );
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const storedService = JSON.parse(localStorage.getItem("selectedService"));

    if (storedService?.id) {
      const serviceId = storedService.id;
      axios
        .get(`${BASE.BASE_URL}/service-detail/getByServiceId?id=${serviceId}`)
        .then((response) => {
          setServiceDetail(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching service details:", error);
        });
    }
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

  if (!selectedService) {
    return <p className="text-center text-red-500">No service is selected.</p>;
  }

  return (
    <div className="service-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
      </button>

      <h4 className="service-title0">{selectedService.name}</h4>
      <img
        src={selectedService.image}
        alt={selectedService.name}
        className="service-image"
      />
      <p className="service-price">
        Price:{" "}
        {selectedService.total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <p className="service-gap">
        Interval between uses: {selectedService.gapDay} day
      </p>

      {serviceDetail && serviceDetail.length > 0 ? (
        <div className="service-details-list">
          <h4 className="service-details-title">Service Details</h4>
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
                    Price:{" "}
                    {detail.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
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
        <p className="no-service-details">No have Service Details.</p>
      )}
    </div>
  );
};

export default ServiceDetails;
