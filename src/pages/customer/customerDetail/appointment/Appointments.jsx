import React, { useEffect, useState, useRef } from "react";
import { Eye, X, Calendar } from "lucide-react";
import "./Appointment.css";
import ContentModal from "./modal/ContentModal";
import ProfileModal from "./modal/ProfileModal";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [countdowns, setCountdowns] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("paymentData"));
    if (storedData) {
      setAppointments(Array.isArray(storedData) ? storedData : [storedData]);
    }
  }, []);

  const convertToDate = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;
    const formattedDate = new Date(`${dateStr}T${timeStr}:00`);
    return isNaN(formattedDate.getTime()) ? null : formattedDate;
  };

  useEffect(() => {
    const updateCountdown = () => {
      const newCountdowns = appointments.map((appointment) => {
        const startTime = convertToDate(
          appointment.date,
          appointment.startTime
        );
        if (!startTime) return "Invalid date!";

        const currentTime = new Date();
        const diff = startTime - currentTime;

        if (diff <= 0) return "Time's up!";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours} : ${minutes.toString().padStart(2, "0")} : ${seconds
          .toString()
          .padStart(2, "0")} hours`;
      });

      setCountdowns(newCountdowns);
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerId);
  }, [appointments]);

  const getTimeLeft = (startTime) => {
    const diff = startTime - new Date();
    if (diff <= 0) return "Time's up!";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours} : ${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")} hours`;
  };

  const handleShowPopup = (type) => {
    setCurrentModalType(type);
    setShowPopup(true);
  };
  const handleClosePopup = () => setShowPopup(false);

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

  if (appointments.length === 0) {
    return <p>No appointment data available.</p>;
  }

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <div className="header-date">DATE</div>
        <div className="header-type">SERVICE</div>
        <div className="header-patient">THERAPIST PROFILE</div>
        <div className="header-time">TIME SCHEDULED</div>
        <div className="header-actions"></div>
      </div>

      {appointments.map((appointment, index) => (
        <div className="appointment-row" key={index}>
          <div className="appointment-date">{appointment.date}</div>

          <div className="appointment-type">
            <div className="type-primary">{appointment.service}</div>
            {countdowns[index] && (
              <div className="countdown">{countdowns[index]}</div>
            )}
          </div>

          <div className="appointment-patient">
            <div className="patient-info">
              <div className="patient-name">{appointment.doctor}</div>
              <div
                className="view-profile-link"
                onClick={() => handleShowPopup("Profile")}
              >
                View Profile
              </div>
            </div>
          </div>

          <div className="appointment-time">
            {appointment.startTime} - {appointment.endTime}
          </div>

          <div className="appointment-actions">
            <div>
              <button
                className="action-button view-details-button"
                onClick={() => handleShowPopup("Details")}
              >
                <Eye size={16} />
                <span>View Details</span>
              </button>
            </div>

            <div className="actions-dropdown" ref={dropdownRef}>
              <button
                className="action-button more-actions-button"
                onClick={() => handleToggleDropdown(index)}
              >
                Actions
              </button>

              {openDropdown === index && (
                <div className="dropdown-content">
                  <button
                    className="dropdown-item cancel-button"
                    onClick={() => alert("Cancel Appointment")}
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  <button
                    className="dropdown-item change-button"
                    onClick={() => alert("Change Reservation")}
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

      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h5>
                {currentModalType === "Details"
                  ? "Appointment Details"
                  : "Therapist Profile"}
              </h5>
              <button className="close-btn" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <div className="popup-body">
              {currentModalType === "Details" ? (
                <ContentModal />
              ) : (
                <ProfileModal />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
