import React, { useEffect, useState, useRef } from "react";
import { Eye, X, DollarSign } from "lucide-react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 4;

  const [cancelReasons, setCancelReasons] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Trạng thái cho modal xác nhận
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedReasonId, setSelectedReasonId] = useState(undefined);
  const [customReason, setCustomReason] = useState("");

  const calculateTotalPriceUSD = (serviceDetails) => {
    const totalUSD = serviceDetails.reduce(
      (total, detail) => total + (detail.price || 0),
      0
    );
    return totalUSD.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const calculateTotalPriceVND = (serviceDetails) => {
    const totalUSD = serviceDetails.reduce(
      (total, detail) => total + (detail.price || 0),
      0
    );
    return totalUSD * 25000 * 0.1;
  };

  const getTherapistsFromDetails = (appointment) => {
    if (
      appointment.service &&
      appointment.service.service_therapists &&
      appointment.service.service_therapists.length > 0
    ) {
      const firstTherapist = appointment.service.service_therapists[0];
      if (
        firstTherapist &&
        firstTherapist.therapist &&
        firstTherapist.therapist.account
      ) {
        return firstTherapist.therapist.account.name;
      }
    }
    return "N/A";
  };

  useEffect(() => {
    if (accountId) {
      fetch(`http://localhost:8080/appointments/account/${accountId}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.status === 200) {
            const initialAppointments = result.data
              .filter(
                (appointment) =>
                  appointment.status === "CONFIRMED" ||
                  appointment.status === "PENDING"
              )
              .map((appointment) => ({
                id: appointment.id,
                date: appointment.createdTime.split("T")[0],
                service: appointment.service.name,
                totalPrice: calculateTotalPriceUSD(
                  appointment.service.service_details
                ),
                totalPriceVND: calculateTotalPriceVND(
                  appointment.service.service_details
                ),
                therapists: getTherapistsFromDetails(appointment),
                status: appointment.status,
              }));
            console.log("Initial Appointments:", initialAppointments);
            setAppointments(initialAppointments);
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

  const pageCount = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentAppointments = appointments.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    setOpenDropdown(null);
  };

  const handleShowPopup = (appointment) => setSelectedAppointment(appointment);
  const handleClosePopup = () => setSelectedAppointment(null);
  const handleToggleDropdown = (appointmentId) => {
    setOpenDropdown(openDropdown === appointmentId ? null : appointmentId);
  };

  const handleReDeposit = async (appointmentId, totalCostVND) => {
    if (!appointmentId || !totalCostVND) {
      console.error("Invalid appointment ID or total cost:", {
        appointmentId,
        totalCostVND,
      });
      alert("Invalid appointment data. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/vnpay/create-payment-url?appointmentId=${appointmentId}&amount=${totalCostVND}&returnUrl=http://localhost:5173/payment-return`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (result.status === 200 && result.data) {
        const paymentUrl = result.data;
        console.log("Redirecting to Payment URL:", paymentUrl);
        window.location.href = paymentUrl;
      } else {
        console.error("Failed to create payment URL:", result.message);
        alert(`Failed to initiate payment: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
      alert("An error occurred while processing your payment.");
    }
  };

  const fetchCancelReasons = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/cancel-reason-common/getAll"
      );
      const result = await response.json();
      if (result.status === 200) {
        setCancelReasons(result.data);
      } else {
        console.error("Failed to fetch cancel reasons:", result.message);
      }
    } catch (error) {
      console.error("Error fetching cancel reasons:", error);
    }
  };

  const handleCancel = (appointmentId) => {
    const appointmentToCancel = appointments.find(
      (appt) => appt.id === appointmentId
    );
    console.log("Appointment being cancelled:", appointmentToCancel);
    setSelectedAppointmentId(appointmentId);
    setSelectedReasonId(undefined);
    setCustomReason("");
    fetchCancelReasons();
    setShowCancelModal(true);
  };

  const handleReasonChange = (reasonId) => {
    setSelectedReasonId(reasonId);
    setCustomReason("");
    console.log(
      "Selected Reason:",
      cancelReasons.find((reason) => reason.id === reasonId) || {
        id: null,
        reason: "Other",
      }
    );
  };

  const handleCustomReasonChange = (e) => {
    setCustomReason(e.target.value);
    console.log("Custom Reason Input:", e.target.value);
  };

  const handleSendCancel = async () => {
    if (selectedReasonId === undefined) {
      toast.error("Please select a reason for cancellation!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = async () => {
    const cancelData = selectedReasonId
      ? { commonId: selectedReasonId }
      : { cancelReason: customReason, commonId: null };

    console.log("Data sent to API:", cancelData);

    try {
      const response = await fetch(
        `http://localhost:8080/appointments/cancel/${selectedAppointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cancelData),
        }
      );

      const result = await response.json();
      if (result.status === 200) {
        toast.success("Appointment cancelled successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setAppointments((prev) =>
          prev.filter((appt) => appt.id !== selectedAppointmentId)
        );
        setShowCancelModal(false);
        setShowConfirmModal(false);
        setSelectedReasonId(undefined);
        setCustomReason("");
      } else {
        console.error("Failed to cancel appointment:", result.message);
        toast.error(`Failed to cancel: ${result.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
        setShowConfirmModal(false);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("An error occurred while cancelling your appointment.", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <div className="header-date">DATE</div>
        <div className="header-service">SERVICE</div>
        <div className="header-price">TOTAL PRICE</div>
        <div className="header-therapists">THERAPISTS</div>
        <div className="header-status">STATUS</div>
        <div className="header-actions"></div>
      </div>

      {currentAppointments.map((appointment) => (
        <div className="appointment-row" key={appointment.id}>
          <div className="appointment-date">{appointment.date}</div>
          <div className="appointment-service">{appointment.service}</div>
          <div className="appointment-price">{appointment.totalPrice}</div>
          <div className="appointment-therapists">{appointment.therapists}</div>
          <div className="appointment-status">
            <span className={`status-${appointment.status.toLowerCase()}`}>
              {appointment.status}
            </span>
          </div>
          <div className="appointment-actions">
            <button
              className="action-button view-details-button"
              onClick={() => handleShowPopup(appointment)}
            >
              <Eye size={16} />
              <span>Details</span>
            </button>

            <div className="actions-dropdown" ref={dropdownRef}>
              <button
                className="action-button more-actions-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleDropdown(appointment.id);
                }}
              >
                Actions
              </button>
              {openDropdown === appointment.id && (
                <div className="dropdown-content">
                  {appointment.status === "PENDING" && (
                    <button
                      className="dropdown-item redeposit-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReDeposit(
                          appointment.id,
                          appointment.totalPriceVND
                        );
                      }}
                    >
                      <DollarSign size={14} />
                      <span>Re-deposit</span>
                    </button>
                  )}
                  {appointment.status === "CONFIRMED" && (
                    <button
                      className="dropdown-item cancel-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel(appointment.id);
                      }}
                    >
                      <X size={14} />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

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
            <div className="popup-bodyss">
              <ContentModal appointment={selectedAppointment} />
            </div>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div
          className="popup-overlays"
          onClick={() => setShowCancelModal(false)}
        >
          <div className="popup-content3" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h5>Cancel Appointment</h5>
              <button
                className="close-btn"
                onClick={() => setShowCancelModal(false)}
              >
                X
              </button>
            </div>
            <div className="popup-bodyss">
              <div className="cancel-reasons-list">
                {cancelReasons.map((reason) => (
                  <label key={reason.id} className="reason-item">
                    <input
                      type="radio"
                      name="cancelReason"
                      value={reason.id}
                      checked={selectedReasonId === reason.id}
                      onChange={() => handleReasonChange(reason.id)}
                    />
                    <span>{reason.reason}</span>
                  </label>
                ))}
                <label className="reason-item">
                  <input
                    type="radio"
                    name="cancelReason"
                    value="other"
                    checked={selectedReasonId === null}
                    onChange={() => handleReasonChange(null)}
                  />
                  <span>Other (please specify)</span>
                </label>
              </div>

              {selectedReasonId === null && (
                <textarea
                  className="form-control mt-3"
                  placeholder="Enter your reason here"
                  value={customReason}
                  onChange={handleCustomReasonChange}
                />
              )}

              <button
                className="btn btn-primary1 mt-3"
                onClick={handleSendCancel}
                disabled={
                  selectedReasonId === undefined ||
                  (selectedReasonId === null && !customReason.trim())
                }
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div
          className="popup-overlays"
          onClick={() => setShowConfirmModal(false)}
        >
          <div className="popup-content4" onClick={(e) => e.stopPropagation()}>
            <div className="popup-headers">
              <h5>Confirm Cancellation</h5>
              <button
                className="close-btn"
                onClick={() => setShowConfirmModal(false)}
              >
                X
              </button>
            </div>
            <div className="popup-bodyss">
              <p className="confirm-message">
                Are you sure you want to cancel this appointment?
              </p>
              <div className="confirm-buttons">
                <button
                  className="btn btn-confirm-yes"
                  onClick={handleConfirmCancel}
                >
                  Yes
                </button>
                <button
                  className="btn btn-confirm-no"
                  onClick={() => setShowConfirmModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Appointments;
