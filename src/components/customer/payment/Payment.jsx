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

  const { service, doctor, date, startTime, price } = data;
  const [discountRate, setDiscountRate] = useState(0);

  const prepaymentRate = 0.1;
  const discount = price * discountRate;
  const prepayment = price * prepaymentRate;
  const totalCost = prepayment + discount;

  const handleContinue = () => {
    const paymentData = {
      service,
      doctor,
      date,
      startTime,
    };
    const existingData = JSON.parse(localStorage.getItem("paymentData")) || [];
    existingData.push(paymentData);
    localStorage.setItem("paymentData", JSON.stringify(existingData));
    navigate("/customer-detail/appointments", { state: existingData });
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

          <div className="payment-method">
            <input
              type="radio"
              id="credit-card"
              name="payment"
              value="credit-card"
              checked={paymentMethod === "credit-card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="credit-card">
              <span>Credit card</span>
              <div className="card-icons">
                <img src={IMAGES.visa} alt="Visa" />
                <img src={IMAGES.mastercard} alt="Mastercard" />
              </div>
            </label>
          </div>
        </div>

        <div className="card-details">
          <div className="form-group">
            <label>Name on card *</label>
            <input type="text" placeholder="e.g. my personal card" />
          </div>

          <div className="form-group">
            <label>Card number *</label>
            <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiration *</label>
              <input type="text" placeholder="MM / YY" />
            </div>
            <div className="form-group">
              <label>Card code *</label>
              <input type="text" placeholder="XXX" />
            </div>
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
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span>Discount ({(discountRate * 100).toFixed(0)}%)</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="price-item">
            <span>10% Prepayment</span>
            <span>${prepayment.toFixed(2)}</span>
          </div>
          <div className="price-item total">
            <span>Total cost</span>
            <span>${totalCost.toFixed(2)}</span>
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
