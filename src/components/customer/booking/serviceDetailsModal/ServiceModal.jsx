// import React from "react";
// import "./ServiceModal.css";

// const ServiceModal = () => {
//   return (
//     <div>
//       <p>
//         This is the detailed content that will be displayed inside the popup
//         body.
//       </p>
//       {/* You can add any other content here */}
//     </div>
//   );
// };

// export default ServiceModal;

// import React, { useEffect, useState } from "react";
// import "./ServiceModal.css";
// import axios from "axios";
// import BASE from "../../../../constants/base";

// const ServiceModal = () => {
//   const [selectedService, setSelectedService] = useState(null);
//   const [serviceDetail, setServiceDetail] = useState(null);
//   const [serviceSteps, setServiceSteps] = useState([]);

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

//   // useEffect(() => {
//   //   const storedService = JSON.parse(localStorage.getItem("selectedServiceID"));
//   //   console.log("Check id từ bookingpage", storedService);

//   //   if (storedService?.id) {
//   //     const serviceId = storedService.id;

//   //     // Fetch service details
//   //     axios
//   //       .get(`${BASE.BASE_URL}/service-detail/getByServiceId?id=${serviceId}`)
//   //       .then((response) => {
//   //         setServiceDetail(response.data.data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching service details:", error);
//   //       });
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   if (serviceDetail && serviceDetail.length > 0) {
//   //     serviceDetail.forEach((detail) => {
//   //       axios
//   //         .get(
//   //           `${BASE.BASE_URL}/service-detail-step/getByServiceDetailId?id=${detail.id}`
//   //         )
//   //         .then((response) => {
//   //           setServiceSteps((prevSteps) => [
//   //             ...prevSteps,
//   //             { detailId: detail.id, steps: response.data.data },
//   //           ]);
//   //         })
//   //         .catch((error) => {
//   //           console.error("Error fetching service steps:", error);
//   //         });
//   //     });
//   //   }
//   // }, [serviceDetail]);

//   if (!selectedService) {
//     return <p className="text-center text-red-500">No service is selected.</p>;
//   }

//   return (
//     <div className="service-details-container">
//       <h4 className="service-title">{selectedService.name}</h4>
//       <img
//         src={selectedService.image}
//         alt={selectedService.name}
//         className="service-image"
//       />
//       <p className="service-price">
//         Price: {selectedService.total.toLocaleString()}₫
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
//                     Time: {detail.duration} phút
//                   </p>
//                   <p className="detail-description">
//                     Description: {detail.description}
//                   </p>
//                   <p className="detail-price">
//                     Price: {detail.price.toLocaleString()}₫
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
//         <p className="no-service-details">Không có chi tiết dịch vụ nào.</p>
//       )}
//     </div>
//   );
// };
// export default ServiceModal;

//----------------------------------------------------------------

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

  if (!selectedService) {
    return <p className="text-center text-red-500">No service is selected.</p>;
  }

  return (
    <div className="service-details-container">
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
                    Price: {detail.price.toLocaleString()}₫
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
