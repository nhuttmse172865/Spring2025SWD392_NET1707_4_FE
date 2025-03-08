import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, X } from "lucide-react";
import "./PaymentFailure.css";

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("/payment");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="payment-status-container">
      <div className="payment-status-card">
        <div className="status-icon failure">
          <AlertTriangle size={80} strokeWidth={2} color="#dc3545" />
        </div>
        <h2>Payment Failed</h2>
        <p className="status-message">
          Sorry, we couldn’t process your payment.
        </p>
        <p className="status-detail">
          Please check your payment details and try again, or contact support if
          the issue persists.
        </p>
        <div className="button-group">
          <button
            className="status-button try-again-btn"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
          <button className="status-button" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
