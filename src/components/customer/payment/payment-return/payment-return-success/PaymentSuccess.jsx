import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <div className="status-icon success">
          <CheckCircle size={80} strokeWidth={2} color="#28a745" />
        </div>
        <h2>Booking Successful!</h2>
        <p className="status-message">
          Your booking has been processed successfully.
        </p>
        <p className="status-detail">
          Thank you for your booking! Your appointment is now confirmed. We'll
          send you a confirmation email shortly.
        </p>
        <button
          className="status-button success-btn"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
