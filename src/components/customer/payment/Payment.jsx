import React, { useState } from "react";
import IMAGES from "../../../constants/images";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return <p>No booking data available.</p>;
  }

  const { service, doctor, date, startTime, price, appointmentId } = data;

  const [discountRate, setDiscountRate] = useState(0);
  const prepaymentRate = 0.1;
  const discount = price * discountRate;
  const prepayment = price * prepaymentRate;
  const totalCost = prepayment - discount;
  const totalCostVND = totalCost * 25000;

  const formatUSD = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleContinue = async () => {
    try {
      if (totalCostVND === 0) {
        // Nếu totalCostVND = 0, cập nhật trạng thái appointment
        const updateResponse = await fetch(
          `http://localhost:8080/appointments/${appointmentId}/status?status=CONFIRMED`,
          {
            method: "PUT",
            headers: {
              Accept: "*/*",
            },
          }
        );

        if (updateResponse.ok) {
          window.location.href = "/payment-success";
        } else {
          console.error("Failed to update appointment status");
          alert("Failed to confirm appointment.");
        }
        return;
      }

      const response = await fetch(
        `http://localhost:8080/vnpay/create-payment-url?appointmentId=${appointmentId}&amount=${totalCostVND}&returnUrl=http://localhost:5173/payment-return`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.status === 200) {
        const paymentUrl = result.data;
        console.log("Payment URL:", paymentUrl);
        window.location.href = paymentUrl;
      } else {
        console.error("Failed to create payment URL:", result.message);
        alert("Failed to create payment URL: " + result.message);
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
      alert("An error occurred while processing your payment.");
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-form">
        <h2>Choose payment method</h2>
        <div className="payment-methods">
          <div className="payment-method">
            <input
              type="radio"
              id="stripe"
              name="payment"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">
              <span>VNPAY</span>
              <img src={IMAGES.vnpay} alt="VNPAY" />
            </label>
          </div>

          <div className="payment-method">
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">
              <span>PayPal</span>
              <img src={IMAGES.Paypal} alt="PayPal" />
            </label>
          </div>
        </div>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="summary-details">
          <div className="summary-item">
            <label>Service</label>
            <input type="text" value={service} readOnly />
          </div>

          <div className="summary-row">
            <div className="summary-item">
              <label>Date</label>
              <input type="text" value={date} readOnly />
            </div>
            <div className="summary-item">
              <label>Time</label>
              <input type="text" value={`${startTime}`} readOnly />
            </div>
          </div>

          <div className="summary-item">
            <label>Doctor</label>
            <input type="text" value={doctor} readOnly />
          </div>
        </div>
        <div className="pricing-details">
          <div className="price-item">
            <span>Subtotal</span>
            <span>{formatUSD(price)}</span>
          </div>
          <div className="price-item">
            <span>Discount ({(discountRate * 100).toFixed(0)}%)</span>
            <span>{formatUSD(discount)}</span>
          </div>
          <div className="price-item">
            <span>10% Prepayment</span>
            <span>{formatUSD(prepayment)}</span>
          </div>
          <div className="price-item total">
            <span>Total cost</span>
            <span>{formatUSD(totalCost)}</span>
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
