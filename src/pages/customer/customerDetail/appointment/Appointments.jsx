import React, { useEffect, useState, useRef } from "react";
import { Eye, X, Calendar } from "lucide-react";
import "./Appointment.css";
import ContentModal from "./modal/ContentModal";
import ProfileModal from "./modal/ProfileModal";

const Appointments = () => {
  const [countdowns, setCountdowns] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const appointments = [
    {
      id: 1,
      date: "21/2/2025",
      type: "Geo Medical Center",
      therapist: "Chinedu Ikechukwu",
      time: "08:45 AM",
    },
    {
      id: 2,
      date: "20/2/2025",
      type: "Teleconsult Call",
      therapist: "Ayotunde Akinleye",
      time: "11:00 AM",
    },
    {
      id: 3,
      date: "20/2/2025",
      type: "Geo Medical Center",
      therapist: "Mr. Ayo Akintunde",
      time: "08:00 AM",
    },
    {
      id: 4,
      date: "20/2/2025",
      type: "Geo Medical Center",
      therapist: "Mr. Ayo Akintunde",
      time: "07:30 PM",
    },
  ];

  const convertToDate = (dateStr, timeStr) => {
    const dateParts = dateStr.split("/");
    const timeParts = timeStr.split(" ");
    const timeArr = timeParts[0].split(":");
    let hour = parseInt(timeArr[0], 10);
    const minute = parseInt(timeArr[1], 10);

    if (timeParts[1] === "PM" && hour !== 12) hour += 12;
    if (timeParts[1] === "AM" && hour === 12) hour = 0;

    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[0], 10);

    return new Date(year, month, day, hour, minute, 0);
  };

  const getTimeLeft = (startTime) => {
    const currentTime = new Date();
    if (isNaN(startTime.getTime())) return "Invalid date!";

    const diff = startTime - currentTime;
    if (diff <= 0) return "Time's up!";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours} : ${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")} hours`;
  };

  useEffect(() => {
    const updateCountdown = () => {
      const newCountdowns = appointments.map((appointment) => {
        const startTime = convertToDate(appointment.date, appointment.time);
        return getTimeLeft(startTime);
      });
      setCountdowns(newCountdowns);
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerId);
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");

  const handleShowPopup = (type) => {
    setCurrentModalType(type);
    setShowPopup(true);
  };
  const handleClosePopup = () => setShowPopup(false);

  const handleToggleDropdown = (appointmentId) => {
    if (openDropdown === appointmentId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(appointmentId);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="appointment-row" key={appointment.id}>
          <div className="appointment-date">{appointment.date}</div>

          <div className="appointment-type">
            <div className="type-primary">{appointment.type}</div>
            {appointment.typeDetail && (
              <div className="type-detail">{appointment.typeDetail}</div>
            )}
            {countdowns[index] && (
              <div className="countdown">{countdowns[index]}</div>
            )}
          </div>

          <div className="appointment-patient">
            <div className="patient-info">
              <div className="patient-name">{appointment.therapist}</div>
              <div
                className="view-profile-link"
                onClick={() => handleShowPopup("Profile")}
              >
                View Profile
              </div>
            </div>
          </div>

          <div className="appointment-time">{appointment.time}</div>

          <div className="appointment-actions">
            <div>
              <button
                className="action-button view-details-button"
                onClick={() => handleShowPopup("Details")}
              >
                <Eye size={16} />
                <span>View Details</span>
              </button>

              {showPopup && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                  <div
                    className="popup-content"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                    onClick={() => handleItemClick("Cancel")}
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  <button
                    className="dropdown-item change-button"
                    onClick={() => handleItemClick("Change Reservation")}
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
    </div>
  );
};

export default Appointments;
