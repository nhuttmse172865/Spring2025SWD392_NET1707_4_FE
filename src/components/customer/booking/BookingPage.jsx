import { useEffect, useState } from "react";
import { Application, Calendar } from "react-rainbow-components";
import { addMinutes, format, parse } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import ServiceModal from "./serviceDetailsModal/ServiceModal";
import "./BookingPage.css";

const theme = {
  rainbow: {
    palette: {
      brand: "#ff4f9d",
      mainBackground: "#F0F8FF",
      text: {
        main: "#333333",
        label: "#4CAF50",
      },
    },
  },
};

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const doctorServices = [
  {
    doctor_id: 1,
    doctor_name: "Emely Jonson",
    role: "Chuyên viên massage",
    services: [
      { id: 5, name: "Aromatherapy Massage" },
      { id: 4, name: "Body Scrub" },
      { id: 6, name: "Slimming Treatment" },
    ],
  },
  {
    doctor_id: 2,
    doctor_name: "Lola Jonson",
    role: "Chuyên viên chăm sóc da",
    services: [
      { id: 1, name: "Deep Cleansing Facial" },
      { id: 2, name: "Hydrating Facial" },
      { id: 3, name: "Anti-Acne Facial" },
    ],
  },
  {
    doctor_id: 3,
    doctor_name: "Rose Marian",
    role: "Chuyên viên chăm sóc da",
    services: [
      { id: 7, name: "Hair Strengthening" },
      { id: 8, name: "Dandruff Treatment" },
      { id: 9, name: "Scalp Detox" },
    ],
  },
  {
    doctor_id: 4,
    doctor_name: "Rose Marian",
    role: "Chuyên viên chăm sóc da",
    services: [
      { id: 1, name: "Deep Cleansing Facial" },
      { id: 3, name: "Anti-Acne Facial" },
      { id: 2, name: "Hydrating Facial" },
    ],
  },
];

const services = [
  {
    id: 1,
    name: "Deep Cleansing Facial",
    category_id: 1,
    gap_day: 7,
    price: 500000,
    duration: 60,
    image: "/images/deep-cleansing.jpg",
  },
  {
    id: 2,
    name: "Hydrating Facial",
    category_id: 1,
    gap_day: 10,
    price: 600000,
    duration: 75,
    image: "/images/hydrating.jpg",
  },
  {
    id: 3,
    name: "Anti-Acne Facial",
    category_id: 1,
    gap_day: 14,
    price: 550000,
    duration: 70,
    image: "/images/anti-acne.jpg",
  },
  {
    id: 4,
    name: "Body Scrub",
    category_id: 2,
    gap_day: 7,
    price: 400000,
    duration: 45,
    image: "/images/body-scrub.jpg",
  },
  {
    id: 5,
    name: "Aromatherapy Massage",
    category_id: 2,
    gap_day: 14,
    price: 700000,
    duration: 90,
    image: "/images/aromatherapy.jpg",
  },
  {
    id: 6,
    name: "Slimming Treatment",
    category_id: 2,
    gap_day: 21,
    price: 800000,
    duration: 120,
    image: "/images/slimming.jpg",
  },
  {
    id: 7,
    name: "Hair Strengthening",
    category_id: 3,
    gap_day: 14,
    price: 650000,
    duration: 60,
    image: "/images/hair-strengthening.jpg",
  },
  {
    id: 8,
    name: "Dandruff Treatment",
    category_id: 3,
    gap_day: 10,
    price: 450000,
    duration: 50,
    image: "/images/dandruff-treatment.jpg",
  },
  {
    id: 9,
    name: "Scalp Detox",
    category_id: 3,
    gap_day: 7,
    price: 480000,
    duration: 55,
    image: "/images/scalp-detox.jpg",
  },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [currentModalType, setCurrentModalType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const generateTimeSlots = (start, end, duration = 15) => {
    let slots = [];
    let current = parse(start, "HH:mm", new Date());
    let endTime = parse(end, "HH:mm", new Date());

    while (current < endTime) {
      const potentialEndTime = addMinutes(current, duration);

      if (potentialEndTime > endTime) break;

      const startTimeStr = format(current, "HH:mm");
      slots.push({
        start: startTimeStr,
        end: format(potentialEndTime, "HH:mm"),
        display: startTimeStr,
      });

      current = addMinutes(current, 15);
    }
    if (format(current, "HH:mm") === "17:00") {
      slots.push({ start: "17:00", end: "17:15", display: "17:00" });
    }

    return slots;
  };

  const getAvailableTimeSlots = () => {
    if (!selectedService) {
      return generateTimeSlots("07:00", "17:00", 15);
    }

    const serviceData = services.find((s) => s.id === selectedService);
    if (!serviceData) return [];

    return generateTimeSlots("07:00", "17:00", serviceData.duration);
  };

  const timeSlots = getAvailableTimeSlots();

  const handleAppointment = () => {
    if (!selectedService || !selectedDoctor || !selectedTime || !selectedDate) {
      alert("Please select all fields before proceeding!");
      return;
    }

    const selectedTimeSlot = timeSlots.find(
      (slot) => slot.display === selectedTime
    );

    navigate("/payment", {
      state: {
        service: selectedServiceName,
        doctor: selectedDoctor,
        date: format(selectedDate, "yyyy-MM-dd"),
        startTime: selectedTimeSlot.start,
        endTime: selectedTimeSlot.end,
        price: selectedServiceData.price,
      },
    });
  };

  const filteredDoctors = doctorServices.filter((doctor) =>
    doctor.services.some((service) => service.id === selectedService)
  );

  useEffect(() => {
    const storedServiceId = localStorage.getItem("selectedServiceId");
    if (storedServiceId) {
      setSelectedService(Number(storedServiceId));
      localStorage.removeItem("selectedServiceId");
    }
  }, []);

  const handleServiceChange = (e) => {
    const newServiceId = Number(e.target.value);
    setSelectedService(newServiceId);
    setSelectedDoctor("");
    setSelectedTime(null);
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const selectedServiceName =
    services.find((service) => service.id === selectedService)?.name || "";

  const handleShowPopup = (type) => {
    setCurrentModalType(type);
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  const getCurrentTimeSlot = () => {
    if (!selectedTime) return null;
    return timeSlots.find((slot) => slot.display === selectedTime);
  };

  const currentTimeSlot = getCurrentTimeSlot();

  return (
    <Application theme={theme}>
      <div className="appointment-card">
        <h1 className="appointment-title">Make an Appointment</h1>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Select Service</label>
            <select
              className="form-select1"
              value={selectedService}
              onChange={handleServiceChange}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Doctor</label>
            <select
              className="form-select1"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              disabled={!selectedService}
            >
              <option value="">Select a doctor</option>
              {filteredDoctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_name}>
                  {doctor.doctor_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedServiceData && (
          <div className="card">
            <img
              src={selectedServiceData.image}
              alt={`Image of ${selectedServiceData.name}`}
              className="profile-image"
            />
            <div className="content">
              <h2 className="title">{selectedServiceData.name}</h2>
              <div className="price-time">
                <span className="price">${selectedServiceData.price}</span>
                <span className="time">
                  {" "}
                  · {selectedServiceData.gap_day} days
                </span>
              </div>
            </div>
            <button
              className="action-button view-details-button"
              onClick={() => handleShowPopup("Details")}
            >
              <Eye size={16} />
              <span>View Details</span>
            </button>
            {showPopup && (
              <div className="popup-overlay1" onClick={handleClosePopup}>
                <div
                  className="popup-content1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="popup-header1">
                    <h5>
                      {currentModalType === "Details" ? "Service Details" : ""}
                    </h5>
                    <button className="close-btn" onClick={handleClosePopup}>
                      X
                    </button>
                  </div>
                  <div className="popup-body1">
                    {currentModalType === "Details" ? <ServiceModal /> : null}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="date-time-group">
          <div className="form-group0">
            <label className="form-label">Select Date</label>
            <div className="calendar-container">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                variant="single"
                locale="en-US"
                className="rainbow-calendar"
                minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                maxDate={new Date(new Date().getFullYear() + 5, 11, 31)}
              />
            </div>
          </div>
          <div className="form-group1">
            <label className="form-label">Select Time</label>
            <div className="time-picker">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`time-button ${
                    selectedTime === slot.display ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTime(slot.display)}
                >
                  {slot.display}
                </button>
              ))}
            </div>
            <p className="time-note">
              {selectedService
                ? `Service duration: ${selectedServiceData?.duration} minutes ${
                    currentTimeSlot
                      ? `(${currentTimeSlot.start} - ${currentTimeSlot.end})`
                      : ""
                  }`
                : "All times are in Central Time (Vietnam)"}
            </p>
          </div>
        </div>

        <div className="contact-info-section">
          <div className="form-group5">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group5">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group5">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <button className="appointment-button" onClick={handleAppointment}>
          Get Appointment
        </button>
      </div>
    </Application>
  );
};

export default BookingPage;
