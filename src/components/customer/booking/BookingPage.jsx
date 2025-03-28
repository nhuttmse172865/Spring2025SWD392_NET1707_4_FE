import { useEffect, useState } from "react";
import { Application, Calendar } from "react-rainbow-components";
import { addMinutes, format, parse, isSameDay } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import ServiceModal from "./serviceDetailsModal/ServiceModal";
import axios from "axios";
import BASE from "../../../constants/base";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../constants/localStorageName";
import "./BookingPage.css";
import { ToastContainer, toast } from "react-toastify";
import Authorization from "../../../middleware/Authorization";
import "react-toastify/dist/ReactToastify.css";
import ROLES from "../../../constants/role";

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

const BookingPage = () => {
  const navigate = useNavigate();

  const [accountId, setAccountId] = useState(null);
  const [customer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const [selectedDate, setSelectedDate] = useState(null);
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
  const [services, setServices] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [showDoctorConfirmation, setShowDoctorConfirmation] = useState(false);
  const [wantDoctor, setWantDoctor] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

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

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/service/getAllServicePaging?page=0&size=10`
      );
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchTherapists = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/get-all-therapists?page=0&size=10`
      );
      const therapistsData = response.data.data.content;
      const transformedDoctors = therapistsData.map((therapist) => ({
        id: therapist.id,
        name: therapist.account ? therapist.account.name : "Unknown",
        experience: therapist.experience,
        speciality: therapist.speciality,
      }));
      setTherapists(transformedDoctors);
    } catch (error) {
      console.error("Error fetching therapists:", error);
    }
  };

  const fetchAllAvailableDates = async () => {
    if (!selectedService) {
      setAvailableDates([]);
      setAvailableTimeSlots([]);
      return;
    }
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/therapist-working-time/get-by-available-time?serviceId=${selectedService}`
      );
      const timeSlots = response.data.data || [];
      const datesWithSlots = new Set();
      timeSlots.forEach((therapist) => {
        therapist.availableTimeSlots.forEach((slot) => {
          const date = new Date(slot.day);
          datesWithSlots.add(format(date, "yyyy-MM-dd"));
        });
      });
      setAvailableDates([...datesWithSlots].map((date) => new Date(date)));
    } catch (error) {
      console.error("Error fetching available dates:", error);
      setAvailableDates([]);
    }
  };

  const fetchAvailableTimeSlots = async () => {
    if (!selectedService || !selectedDate) {
      setAvailableTimeSlots([]);
      return;
    }
    try {
      const response = await axios.get(
        `${
          BASE.BASE_URL
        }/therapist-working-time/get-by-available-time?serviceId=${selectedService}&day=${format(
          selectedDate,
          "yyyy-MM-dd"
        )}`
      );
      setAvailableTimeSlots(response.data.data || []);
      if (wantDoctor === null) {
        setShowDoctorConfirmation(true);
      }
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      setAvailableTimeSlots([]);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    fetchTherapists();
  }, []);

  useEffect(() => {
    fetchAllAvailableDates();
  }, [selectedService]);

  useEffect(() => {
    fetchAvailableTimeSlots();
  }, [selectedService, selectedDate]);

  const generateTimeSlots = (start, end, duration = 15) => {
    let slots = [];
    let current = parse(start, "HH:mm:ss", new Date());
    let endTime = parse(end, "HH:mm:ss", new Date());
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
    return slots;
  };

  const getAvailableTimeSlots = () => {
    const uniqueSlots = new Set();
    let slots = [];
    availableTimeSlots.forEach((therapist) => {
      if (
        !selectedDoctor ||
        therapist.therapistId === parseInt(selectedDoctor)
      ) {
        therapist.availableTimeSlots.forEach((timeSlot) => {
          const generatedSlots = generateTimeSlots(
            timeSlot.startHour,
            timeSlot.endHour
          );
          generatedSlots.forEach((slot) => uniqueSlots.add(slot.start));
        });
      }
    });
    slots = [...uniqueSlots].map((startTime) => {
      const endTime = format(
        addMinutes(parse(startTime, "HH:mm", new Date()), 15),
        "HH:mm"
      );
      return { start: startTime, end: endTime, display: startTime };
    });
    slots.sort(
      (a, b) =>
        parse(a.start, "HH:mm", new Date()) -
        parse(b.start, "HH:mm", new Date())
    );
    return slots;
  };

  const isDateDisabled = (date) => {
    if (!selectedService) return false;
    return !availableDates.some((availableDate) =>
      isSameDay(new Date(availableDate), date)
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const getCurrentTimeSlot = () => {
    if (!selectedTime) return null;
    return timeSlots.find((slot) => slot.display === selectedTime);
  };

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleServiceChange = (e) => {
    const newServiceId = Number(e.target.value);
    setSelectedService(newServiceId);
    setSelectedDoctor("");
    setSelectedTime(null);
    setWantDoctor(null);
    localStorage.removeItem("selectedServiceID");
    localStorage.setItem("selectedServiceID", newServiceId);
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    setSelectedTime(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedDoctor("");
    setWantDoctor(null);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTime(slot.display);
    if (wantDoctor === false) {
      const therapistForSlot = availableTimeSlots.find((therapist) =>
        therapist.availableTimeSlots.some(
          (ts) =>
            parse(ts.startHour, "HH:mm:ss", new Date()) <=
              parse(slot.start, "HH:mm", new Date()) &&
            parse(ts.endHour, "HH:mm:ss", new Date()) >
              parse(slot.start, "HH:mm", new Date())
        )
      );
      setSelectedDoctor(therapistForSlot?.therapistId || "");
    }
  };

  const handleDoctorConfirmation = (choice) => {
    setWantDoctor(choice);
    setShowDoctorConfirmation(false);
    if (!choice) setSelectedDoctor("");
  };

  const handleShowPopup = (type) => {
    setCurrentModalType(type);
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  const handleAppointment = async () => {
    if (!selectedService || !selectedTime || !selectedDate) {
      toast.error("Please select all fields before proceeding!");
      return;
    }

    const selectedTimeSlot = timeSlots.find(
      (slot) => slot.display === selectedTime
    );
    const selectedDoctorName = therapists.find(
      (therapist) => therapist.id === parseInt(selectedDoctor)
    )?.name;

    const appointmentData = accountId
      ? {
          accountId: accountId,
          serviceId: selectedService,
          day: format(selectedDate, "yyyy-MM-dd"),
          therapistId: selectedDoctor,
          startHour: selectedTimeSlot.start,
        }
      : null;

    const previewDataPayload = {
      serviceId: selectedService,
      therapistId: selectedDoctor,
      day: format(selectedDate, "yyyy-MM-dd"),
      startHour: selectedTimeSlot.start,
    };

    try {
      const previewResponse = await axios.post(
        `${BASE.BASE_URL}/appointments/preview-appointment`,
        previewDataPayload,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      if (previewResponse.status === 200) {
        setPreviewData(previewResponse.data.data);
        setIsPreviewModalOpen(true);
      }
    } catch (error) {
      toast.error("Failed to preview appointment. Reloading time slots...", {
        autoClose: 2000,
      });
      await fetchAvailableTimeSlots();
      setSelectedTime(null);
    }
  };

  const handleConfirmAppointment = async () => {
    const selectedTimeSlot = timeSlots.find(
      (slot) => slot.display === selectedTime
    );
    const selectedDoctorName = therapists.find(
      (therapist) => therapist.id === parseInt(selectedDoctor)
    )?.name;

    const appointmentData = accountId
      ? {
          accountId: accountId,
          serviceId: selectedService,
          day: format(selectedDate, "yyyy-MM-dd"),
          therapistId: selectedDoctor,
          startHour: selectedTimeSlot.start,
        }
      : null;

    try {
      const confirmDataPayload = {
        serviceId: selectedService,
        accountId: accountId,
        details: previewData,
      };

      const response = await axios.post(
        `${BASE.BASE_URL}/appointments/confirm-appointment`,
        confirmDataPayload,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      const appointmentId = response.data.data;
      toast.success("Appointment created successfully!");

      setIsPreviewModalOpen(false);
      navigate("/payment", {
        state: {
          service: selectedServiceName,
          doctor: selectedDoctorName,
          date: appointmentData.day,
          startTime: appointmentData.startHour,
          price: selectedServiceData.total,
          appointmentId: appointmentId,
        },
      });
    } catch (error) {
      toast.error("Failed to confirm appointment!");
      setIsPreviewModalOpen(false);
    }
  };

  useEffect(() => {
    const storedServiceId = localStorage.getItem("selectedServiceId");
    localStorage.removeItem("selectedServiceId");
    if (storedServiceId) {
      const serviceId = Number(storedServiceId);
      setSelectedService(serviceId);
      localStorage.setItem("selectedServiceID", serviceId);
    }
  }, []);

  useEffect(() => {
    const bookedServiceId = localStorage.getItem("bookedServiceId");
    localStorage.removeItem("bookedServiceId");
    if (bookedServiceId) {
      const serviceId = Number(bookedServiceId);
      setSelectedService(serviceId);
      localStorage.setItem("selectedServiceID", serviceId);
    }
  }, []);

  const timeSlots = getAvailableTimeSlots();
  const filteredDoctors = therapists.filter((therapist) =>
    availableTimeSlots.some((slot) => slot.therapistId === therapist.id)
  );
  const selectedServiceData = services.find((s) => s.id === selectedService);
  const selectedServiceName =
    services.find((service) => service.id === selectedService)?.name || "";
  const currentTimeSlot = getCurrentTimeSlot();

  const PreviewModal = () => {
    if (!isPreviewModalOpen || !previewData) return null;

    return (
      <div className="appointmentPreview-modal-overlay">
        <div className="appointmentPreview-modal-content">
          <h2>Appointment Preview</h2>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Date</th>
                <th>Service Details</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.startHour}</td>
                  <td>{appointment.endHour}</td>
                  <td>{appointment.day}</td>
                  <td>{appointment.name}</td>
                  <td>{formatPrice(appointment.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="appointmentPreview-modal-actions">
            <button onClick={() => setIsPreviewModalOpen(false)}>Cancel</button>
            <button onClick={handleConfirmAppointment}>Confirm</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Authorization requiredRole={ROLES.CUSTOMER}>
      <Application theme={theme}>
        <div className="appointment-card">
          <h1 className="appointment-title">Make an Appointment</h1>

          <div className="form-row">
            <div className="form-group">
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
          </div>

          {selectedServiceData && (
            <div className="card">
              <img
                src={
                  selectedServiceData.image[0]?.url ||
                  "https://via.placeholder.com/150"
                }
                alt={`Image of ${selectedServiceData.name}`}
                className="profile-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                  console.error(
                    "Failed to load image:",
                    selectedServiceData.image[0]?.url
                  );
                }}
              />
              <div className="content">
                <h2 className="title">{selectedServiceData.name}</h2>
                <div className="price-time">
                  <span>{formatPrice(selectedServiceData?.total || 0)}</span>
                  <span className="time">
                    {" "}
                    · GapDay :{selectedServiceData.gapDay} days
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
                        {currentModalType === "Details"
                          ? "Service Details"
                          : ""}
                      </h5>
                      <button className="close-btn" onClick={handleClosePopup}>
                        x
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
              <div className="calendar-container">
                <Calendar
                  value={selectedDate}
                  onChange={(date) => {
                    handleDateChange(date);
                    if (date && selectedService)
                      setShowDoctorConfirmation(true);
                  }}
                  variant="single"
                  locale="en-US"
                  className="rainbow-calendar"
                  showAdjacentMonths={true}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                  }
                  maxDate={new Date(new Date().getFullYear() + 5, 11, 31)}
                  isDateDisabled={isDateDisabled}
                />
              </div>
            </div>
          </div>

          {wantDoctor === true && (
            <div className="form-group">
              <select
                className="form-select1"
                value={selectedDoctor}
                onChange={handleDoctorChange}
                disabled={!selectedService || !selectedDate}
              >
                <option value="">Select a doctor</option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {wantDoctor !== null && (
            <div className="date-time-group">
              <div className="form-group1">
                {!selectedService || !selectedDate ? (
                  <p className="no-slots-message">
                    Please select service and date first
                  </p>
                ) : timeSlots.length === 0 ? (
                  <p className="no-slots-message">No available time slots</p>
                ) : (
                  <div
                    className={`time-picker ${
                      wantDoctor === true && !selectedDoctor ? "blurred" : ""
                    }`}
                  >
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        className={`time-button ${
                          selectedTime === slot.display ? "selected" : ""
                        }`}
                        onClick={() => handleTimeSlotSelect(slot)}
                        disabled={wantDoctor === true && !selectedDoctor}
                      >
                        {slot.display}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <button className="appointment-button" onClick={handleAppointment}>
            Get Appointment
          </button>
        </div>

        {showDoctorConfirmation && (
          <div className="popup-overlay1">
            <div className="popup-content2">
              <div className="popup-header1">
                <h5>Doctor Selection</h5>
              </div>
              <div className="popup-body1">
                <p>Do you want to select a specific doctor?</p>
                <div className="confirmation-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDoctorConfirmation(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDoctorConfirmation(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <PreviewModal />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Application>
    </Authorization>
  );
};

export default BookingPage;
