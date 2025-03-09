// import React, { useEffect, useState, useRef } from "react";
// import { Eye, X, Calendar } from "lucide-react";
// import "./Appointment.css";
// import ContentModal from "./modal/ContentModal";
// import useLocalStorage from "use-local-storage";
// import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";

// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [accountId, setAccountId] = useState(null);
//   const [customer, setCustomer] = useLocalStorage(
//     LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
//     ""
//   );

//   const calculateTotalPrice = (serviceDetails) => {
//     return serviceDetails.reduce((total, detail) => total + detail.price, 0);
//   };

//   const getTherapistsFromDetails = (appointmentDetails) => {
//     const uniqueTherapists = new Map();
//     appointmentDetails.forEach((detail) => {
//       if (detail.therapist) {
//         uniqueTherapists.set(
//           detail.therapist.id,
//           `${detail.therapist.account.name}`
//         );
//       }
//     });
//     return Array.from(uniqueTherapists.values()).join(", ");
//   };

//   useEffect(() => {
//     if (accountId) {
//       fetch(`http://localhost:8080/appointments/account/${accountId}`)
//         .then((response) => response.json())
//         .then((result) => {
//           if (result.status === 200) {
//             const initialAppointments = result.data
//               .filter((appointment) => appointment.status === "CONFIRMED")
//               .map((appointment) => ({
//                 id: appointment.id,
//                 date: new Date().toISOString().split("T")[0],
//                 service: appointment.service.name,
//                 totalPrice: `$${calculateTotalPrice(
//                   appointment.service.service_details
//                 )}`,
//                 therapists: "Loading...",
//               }));
//             setAppointments(initialAppointments);

//             // Fetch chi tiết cho từng appointment
//             const fetchDetails = async () => {
//               const updatedAppointments = await Promise.all(
//                 initialAppointments.map(async (appt) => {
//                   try {
//                     const response = await fetch(
//                       `http://localhost:8080/appointments/${appt.id}`
//                     );
//                     const detailResult = await response.json();
//                     if (detailResult.status === 200) {
//                       return {
//                         ...appt,
//                         therapists: getTherapistsFromDetails(
//                           detailResult.data.appointment_details
//                         ),
//                       };
//                     }
//                     return appt;
//                   } catch (error) {
//                     console.error(
//                       `Error fetching details for ${appt.id}:`,
//                       error
//                     );
//                     return { ...appt, therapists: "Error loading therapists" };
//                   }
//                 })
//               );
//               setAppointments(updatedAppointments);
//             };
//             fetchDetails();
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching appointments:", error);
//         });
//     }
//   }, [accountId]);

//   useEffect(() => {
//     if (customer) {
//       try {
//         const token = customer;
//         const base64Url = token.split(".")[1];
//         const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//         const jsonPayload = decodeURIComponent(
//           atob(base64)
//             .split("")
//             .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
//             .join("")
//         );

//         const decodedData = JSON.parse(jsonPayload);
//         console.log("Decoded Data:", decodedData);
//         console.log("Customer ID:", decodedData.accountId);
//         setAccountId(decodedData.accountId);
//       } catch (error) {
//         console.error("Invalid JWT Token", error);
//       }
//     }
//   }, [customer]);

//   const [openDropdown, setOpenDropdown] = useState(null);
//   const dropdownRef = useRef(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const handleShowPopup = (appointment) => setSelectedAppointment(appointment);
//   const handleClosePopup = () => setSelectedAppointment(null);

//   const handleToggleDropdown = (appointmentId) => {
//     setOpenDropdown(openDropdown === appointmentId ? null : appointmentId);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="appointments-container">
//       <div className="appointments-header">
//         <div className="header-date">DATE</div>
//         <div className="header-service">SERVICE</div>
//         <div className="header-price">TOTAL PRICE</div>
//         <div className="header-therapists">THERAPISTS</div>
//         <div className="header-actions"></div>
//       </div>

//       {appointments.map((appointment) => (
//         <div className="appointment-row" key={appointment.id}>
//           <div className="appointment-date">{appointment.date}</div>
//           <div className="appointment-service">{appointment.service}</div>
//           <div className="appointment-price">{appointment.totalPrice}</div>
//           <div className="appointment-therapists">{appointment.therapists}</div>
//           <div className="appointment-actions">
//             <button
//               className="action-button view-details-button"
//               onClick={() => handleShowPopup(appointment)}
//             >
//               <Eye size={16} />
//               <span>View Details</span>
//             </button>

//             <div className="actions-dropdown" ref={dropdownRef}>
//               <button
//                 className="action-button more-actions-button"
//                 onClick={() => handleToggleDropdown(appointment.id)}
//               >
//                 Actions
//               </button>
//               {openDropdown === appointment.id && (
//                 <div className="dropdown-content">
//                   <button
//                     className="dropdown-item cancel-button"
//                     onClick={() =>
//                       alert(`Cancel Appointment ID: ${appointment.id}`)
//                     }
//                   >
//                     <X size={14} />
//                     <span>Cancel</span>
//                   </button>
//                   <button
//                     className="dropdown-item change-button"
//                     onClick={() =>
//                       alert(`Change Reservation ID: ${appointment.id}`)
//                     }
//                   >
//                     <Calendar size={14} />
//                     <span>Change Reservation</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}

//       {selectedAppointment && (
//         <div className="popup-overlay" onClick={handleClosePopup}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//             <div className="popup-header">
//               <h5>Appointment Details</h5>
//               <button className="close-btn" onClick={handleClosePopup}>
//                 X
//               </button>
//             </div>
//             <div className="popup-body">
//               <ContentModal appointment={selectedAppointment} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Appointments;

import React, { useEffect, useState, useRef } from "react";
import { Eye, X, Calendar } from "lucide-react";
import ReactPaginate from "react-paginate"; // Add this import
import "./Appointment.css";
import ContentModal from "./modal/ContentModal";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [customer, setCustomer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  // Add pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const calculateTotalPrice = (serviceDetails) => {
    return serviceDetails.reduce((total, detail) => total + detail.price, 0);
  };

  const getTherapistsFromDetails = (appointmentDetails) => {
    const uniqueTherapists = new Map();
    appointmentDetails.forEach((detail) => {
      if (detail.therapist) {
        uniqueTherapists.set(
          detail.therapist.id,
          `${detail.therapist.account.name}`
        );
      }
    });
    return Array.from(uniqueTherapists.values()).join(", ");
  };

  useEffect(() => {
    if (accountId) {
      fetch(`http://localhost:8080/appointments/account/${accountId}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            const initialAppointments = result.data
              .filter((appointment) => appointment.status === "CONFIRMED")
              .map((appointment) => ({
                id: appointment.id,
                date: new Date().toISOString().split("T")[0],
                service: appointment.service.name,
                totalPrice: `$${calculateTotalPrice(
                  appointment.service.service_details
                )}`,
                therapists: "Loading...",
              }));
            setAppointments(initialAppointments);

            const fetchDetails = async () => {
              const updatedAppointments = await Promise.all(
                initialAppointments.map(async (appt) => {
                  try {
                    const response = await fetch(
                      `http://localhost:8080/appointments/${appt.id}`
                    );
                    const detailResult = await response.json();
                    if (detailResult.status === 200) {
                      return {
                        ...appt,
                        therapists: getTherapistsFromDetails(
                          detailResult.data.appointment_details
                        ),
                      };
                    }
                    return appt;
                  } catch (error) {
                    console.error(
                      `Error fetching details for ${appt.id}:`,
                      error
                    );
                    return { ...appt, therapists: "Error loading therapists" };
                  }
                })
              );
              setAppointments(updatedAppointments);
            };
            fetchDetails();
          }
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [accountId]);

  useEffect(() => {
    if (customer) {
      try {
        const token = customer;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );

        const decodedData = JSON.parse(jsonPayload);
        setAccountId(decodedData.accountId);
      } catch (error) {
        console.error("Invalid JWT Token", error);
      }
    }
  }, [customer]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Pagination calculations
  const pageCount = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentAppointments = appointments.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    setOpenDropdown(null); // Close any open dropdowns when changing pages
  };

  const handleShowPopup = (appointment) => setSelectedAppointment(appointment);
  const handleClosePopup = () => setSelectedAppointment(null);
  const handleToggleDropdown = (appointmentId) => {
    setOpenDropdown(openDropdown === appointmentId ? null : appointmentId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <div className="header-date">DATE</div>
        <div className="header-service">SERVICE</div>
        <div className="header-price">TOTAL PRICE</div>
        <div className="header-therapists">THERAPISTS</div>
        <div className="header-actions"></div>
      </div>

      {currentAppointments.map((appointment) => (
        <div className="appointment-row" key={appointment.id}>
          <div className="appointment-date">{appointment.date}</div>
          <div className="appointment-service">{appointment.service}</div>
          <div className="appointment-price">{appointment.totalPrice}</div>
          <div className="appointment-therapists">{appointment.therapists}</div>
          <div className="appointment-actions">
            <button
              className="action-button view-details-button"
              onClick={() => handleShowPopup(appointment)}
            >
              <Eye size={16} />
              <span>View Details</span>
            </button>

            <div className="actions-dropdown" ref={dropdownRef}>
              <button
                className="action-button more-actions-button"
                onClick={() => handleToggleDropdown(appointment.id)}
              >
                Actions
              </button>
              {openDropdown === appointment.id && (
                <div className="dropdown-content">
                  <button
                    className="dropdown-item cancel-button"
                    onClick={() =>
                      alert(`Cancel Appointment ID: ${appointment.id}`)
                    }
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  <button
                    className="dropdown-item change-button"
                    onClick={() =>
                      alert(`Change Reservation ID: ${appointment.id}`)
                    }
                  >
                    <Calendar size={14} />
                    <span>Change Reservation</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Add Pagination Component */}
      {appointments.length > ITEMS_PER_PAGE && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
        />
      )}

      {selectedAppointment && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h5>Appointment Details</h5>
              <button className="close-btn" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <div className="popup-body">
              <ContentModal appointment={selectedAppointment} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
