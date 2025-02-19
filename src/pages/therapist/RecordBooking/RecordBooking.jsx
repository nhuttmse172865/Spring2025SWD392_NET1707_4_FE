import React, { useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import "./RecordBooking.css";
import ElevatedButton from "../../../components/common/button/elevated/ElevatedButton";

const RecordBooking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      patientName: "Alex Sander",
      startTime: "09:00",
      endTime: "09:30",
      date: "2023-10-15",
    },
    {
      id: 2,
      patientName: "MOI Gomes",
      startTime: "10:00",
      endTime: "10:30",
      date: "2023-10-15",
    },
  ]);
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
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
  });
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };
  const showQuizModal = () => {
    setIsQuizModalOpen(true);
  };
  const handleQuizCancel = () => setIsQuizModalOpen(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Time",
      key: "time",
      render: (record) => `${record.startTime} - ${record.endTime}`,
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
          <Button className="record-button" type="primary" onClick={() => showModal(record)}>
            Record
          </Button>
          <Button className="record-button" type="primary" onClick={showQuizModal} style={{ marginLeft: 8 }}>
            View Quiz
          </Button>
        </>
      ),
    },
    
  ];

  return (
    <div className="record-booking-container">
      <Table  className="record-booking-table"  dataSource={bookings} columns={columns} rowKey="id" />

     
      <Modal
        title={`Record - ${selectedBooking?.patientName || ""}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Record"
        cancelText="Cancel"
      >
        <label className="record-booking-label">Diagnose:</label>
        <Input
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Enter diagnosis"
          className="input-record"
        />
        <label>Treatment:</label>
        <Input
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          placeholder="Enter treatment"
          className="input-record"
        />
        <label>Note:</label>
        <Input.TextArea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter additional notes"
          className="input-record"
        />
      </Modal>
      <Modal title="View Quiz " open={isQuizModalOpen} onCancel={handleQuizCancel} footer={null}>
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
    </div>
  );
};

export default RecordBooking;
