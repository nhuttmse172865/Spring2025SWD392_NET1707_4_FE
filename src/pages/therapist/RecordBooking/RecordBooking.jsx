import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, DatePicker, message } from "antd";
import "./RecordBooking.css";
import ElevatedButton from "../../../components/common/button/elevated/ElevatedButton";
import axios from "axios";
import BASE from "../../../constants/base";
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import { set } from "date-fns";
const RecordBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectDate, setSelectedDate] = useState(dayjs());
  const [questions] = useState([
    { question: "What is React?", answer: "A JavaScript library for building UI." },
    { question: "What is JSX?", answer: "A syntax extension for JavaScript." },
    { question: "What are props?", answer: "Props are inputs to components." },
    { question: "What is state?", answer: "State is a built-in React object that holds data." },
    { question: "What is useState?", answer: "A React Hook for state management." },
    { question: "What is useEffect?", answer: "A React Hook for side effects." },
    { question: "What is Virtual DOM?", answer: "A lightweight copy of the real DOM." },
    { question: "What is React Router?", answer: "A library for handling navigation in React." },
    { question: "What is Redux?", answer: "A state management tool for JavaScript apps." },
    { question: "What is a component?", answer: "A reusable piece of UI in React." },
  ]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordingDetail, setRecordingDetail] = useState(null);
  const [resultValue, setResultValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  const saveAppointmentId = (booking) => {
    if (booking?.appointment?.id) {
      localStorage.setItem("selectedAppointmentId", booking.appointment.id);
      console.log("Saved appointmentId:", booking.appointment.id);
      return booking.appointment.id;
    } else if (booking?.appointmentId) {
      localStorage.setItem("selectedAppointmentId", booking.appointmentId);
      console.log("Saved appointmentId:", booking.appointmentId);
      return booking.appointmentId;
    }
    return null;
  };

  useEffect(() => {
    const token = localStorage.getItem("customer_information");
    const decoded = jwtDecode(token);
    const accountId = decoded.accountId; 
    
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`${BASE.BASE_URL}/appointment-detail/getByTherapistId/${accountId}`);
        
        console.log(res.data.data);
        const formatBookings = res.data.data.map((booking, index) => ({
          key: index,
          patientName: booking?.cusName,
          phone: booking?.phone,
          date: booking?.day,
          service: booking?.appointment?.service?.name,
          appointment: booking?.appointment,
          appointmentId: booking?.appointment?.id, 
          appointment_details: booking?.appointment?.appointment_details || [],
        }));
        setBookings(formatBookings);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, [selectDate]);

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  
  const showModal = (booking) => {
    console.log(booking);
    setSelectedBooking(booking);
    setIsModalOpen(true);
    saveAppointmentId(booking);
  };

  const showQuizModal = (booking) => {
    saveAppointmentId(booking);
    setIsQuizModalOpen(true);
  };

  const handleQuizCancel = () => {
    setIsQuizModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRecordClick = (detail, booking) => {
    if (detail.status !== "CHECKIN") {
      message.warning("Only checked-in appointments can be recorded.");
      return;
    }
    
    saveAppointmentId(booking);
    setRecordingDetail(detail);
    setResultValue(detail?.result || "");
  };
  
  const handleSaveResult = async () => {
    try {
  
      
      const response = await axios.post(
        `${BASE.BASE_URL}/appointment-detail/createResult/${recordingDetail.id}`,
        { value: resultValue }
      );
      
      setBookings((pre) =>
        pre.map((booking) => ({
          ...booking,
          appointment_details: booking.appointment_details.map((detail) =>
            detail.id === recordingDetail.id ? 
              { ...detail, result: resultValue } : detail
          ),
        }))
      );
      
      message.success("Result recorded successfully!");
      handleCancel();
      setRecordingDetail(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Service",
      dataIndex: "service",
      key:
        "service",

    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <>
          <Button className="viewdetail-button" type="primary" onClick={() => showModal(record)} style={{ marginLeft: 8 }}>
            View detail
          </Button>
          {/* <Button className="quiz-button" type="default" onClick={() => showQuizModal(record)} style={{ marginLeft: 8 }}>
            View Quiz
          </Button> */}
        </>
      ),
    },
  ];

  return (
    <div className="record-booking-container">
      <Table className="record-booking-table" dataSource={bookings} columns={columns} rowKey="key" loading={isLoading} />

      <Modal 
        title="Record result"
        open={!!recordingDetail}
        onOk={handleSaveResult}
        onCancel={() => setRecordingDetail(null)}
        okText="Save"
        cancelText="Cancel"
      >
        <Input.TextArea
          value={resultValue}
          onChange={(e) => setResultValue(e.target.value)}
          placeholder="Enter result..."
          rows={4}
        />
      </Modal>
      
      <Modal title="View Quiz" open={isQuizModalOpen} onCancel={handleQuizCancel} footer={null}>
        <div className="quiz-modal-container">
          {questions.map((question, index) => (
            <div key={index} className="quiz-question">
              <p>
                <strong>Question: {question.question}</strong>
              </p>
              <p>
                <strong>Answer: {question.answer}</strong>
              </p>
            </div>
          ))}
        </div>
      </Modal>
      
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        cancelText="Cancel"
      >
        {selectedBooking && (
          <>
            <h3 className="h3-apoidetail">Appointment Details</h3>
            {selectedBooking.appointment_details?.map((detail, index) => (
              <div key={index} className="appointment-detail">
                <p className="p-record-appointment"><strong>Date:</strong> {detail?.day}</p>
                <p className="p-record-appointment"><strong>Time:</strong> {detail?.startHour} - {detail?.endHour}</p>
                <p className="p-record-appointment"><strong>Service:</strong> {detail?.name}</p>
                <p className="p-record-appointment"><strong>Result:</strong> {detail?.result || "Not recorded"}</p>
                <Button 
                  className="record-button" 
                  disabled={!!detail.result} 
                  onClick={() => handleRecordClick(detail, selectedBooking)}
                >
                  Record result
                </Button>
                <br />
              </div>
            ))}
          </>
        )}
      </Modal>
    </div>
  );
};

export default RecordBooking;