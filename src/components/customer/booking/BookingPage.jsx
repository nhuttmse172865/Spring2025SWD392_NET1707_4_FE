import React, { useState } from "react";
import { Application, Calendar } from "react-rainbow-components";
import { addMinutes, format, parse } from "date-fns";
import "./BookingPage.css";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const generateTimeSlots = (start, end) => {
    let slots = [];
    let current = parse(start, "HH:mm", new Date());
    let endTime = parse(end, "HH:mm", new Date());

    while (current <= endTime) {
      slots.push(format(current, "HH:mm"));
      current = addMinutes(current, 15);
    }
    return slots;
  };

  const theme = {
    rainbow: {
      palette: {
        brand: "#FF60A7"
      },
    },
  };

  const timeSlots = generateTimeSlots("07:00", "17:00");

  return (
    <div className="appointment-card">
      <h1 className="appointment-title">Make an Appointment</h1>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Select Service</label>
          <select className="form-select">
            <option>Service 1</option>
            <option>Service 2</option>
            <option>Service 3</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Select Doctor</label>
          <select className="form-select">
            <option>Doctor 1</option>
            <option>Doctor 2</option>
            <option>Doctor 3</option>
          </select>
        </div>
      </div>

      <div className="card">
        <img
          src="https://placehold.co/50x50"
          alt="Profile image of a man with a stylish haircut"
          className="profile-image"
        />
        <div className="content">
          <h2 className="title">Aromatherapy Massage</h2>
          <div className="price-time">
            <span className="price">$50</span>
            <span className="time"> · 30 minutes</span>
          </div>
        </div>
      </div>

      <div className="date-time-group">
        <div className="form-group0">
          <label className="form-label">Select Date</label>
          <div className="calendar-container">
            <Application theme={theme}>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                variant="single"
                locale="en-US"
                className="rainbow-calendar"
              />
            </Application>
          </div>
        </div>
        <div className="form-group1">
          <label className="form-label">Select Time</label>
          <div className="time-picker">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className={`time-button ${
                  selectedTime === time ? "selected" : ""
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
          <p className="time-note">All times are in central Time (Viet Nam)</p>
        </div>
      </div>
      <div className="form-groupB text-center">
        <button className="appointment-button">Get Appointment</button>
      </div>
    </div>
  );
};

export default BookingPage;
