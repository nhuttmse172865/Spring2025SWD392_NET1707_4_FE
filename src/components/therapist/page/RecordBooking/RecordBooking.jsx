import React, { useState } from "react";

import "./RecordBooking.css";
import { Button, Modal, Input } from "antd";
const RecordBooking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      patientName: "Alex sander",
      startTime: "09:00",
      endTime: "09:30",
      date: "2023-10-15",
    },
    {
      id: 2,
      patientName: "MOI gomes",
      startTime: "10:00",
      endTime: "10:30",
      date: "2023-10-15",
    },
  ]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isModelOPen, setIsModelOPen] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
  });
  const showModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModelOPen(true);
  };
  const handleOk = () => {
    setIsModelOPen(false);
  };
  const handleCancel = () => {
    setIsModelOPen(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="record-booking-container">
      <h1 className="title-booking">BOOKING</h1>
      <div className="booking-list">
        {bookings.map((booking) => (
          <div className="booking-item" key={booking.id}>
            <div className="booking-info">
              <p className="booking-name">{booking.patientName}</p>
              <p className="booking-time">
                {booking.startTime} - {booking.endTime} | {booking.date}
              </p>
            </div>
            <button
              className="record-button"
              onClick={() => showModal(booking)}
            >
              Record
            </button>
          </div>
        ))}
      </div>
      <Modal
        title={`Record - ${selectedBookingId?.patientName || ""}`}
        open={isModelOPen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Record"
        cancelText="Cancel"
        className="custom-modal"
      >
        <label>Diagnose:</label>
        <Input
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnose"
        />
        <label>Treatment:</label>
        <Input
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          placeholder="Enter treatment"
        />

        <label>Note:</label>
        <Input.TextArea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Enter additional notes"
        />
      </Modal>
    </div>
  );
};

export default RecordBooking;
