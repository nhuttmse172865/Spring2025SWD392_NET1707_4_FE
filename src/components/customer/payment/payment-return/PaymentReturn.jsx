import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);

  const processPayment = async () => {
    const queryParams = new URLSearchParams(location.search);

    const paymentData = {
      appointmentId: queryParams.get("vnp_OrderInfo"),
      amount: queryParams.get("vnp_Amount"),
      transactionCode: queryParams.get("vnp_TxnRef"),
      method: queryParams.get("vnp_CardType"),
      payTime: queryParams.get("vnp_PayDate"),
      responseCode: queryParams.get("vnp_ResponseCode"),
    };

    if (paymentData.responseCode !== "00") {
      console.error(
        "Payment failed with response code:",
        paymentData.responseCode
      );
      alert("Payment failed with response code: " + paymentData.responseCode);
      navigate("/payment-failure");
      setIsProcessing(false);
      return;
    }

    try {
      const paymentResponse = await fetch(
        "http://localhost:8080/payment/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      const paymentResult = await paymentResponse.json();

      if (paymentResponse.ok) {
        console.log("Payment created successfully:", paymentResult);
        const updateStatusResponse = await fetch(
          `http://localhost:8080/appointments/${paymentData.appointmentId}/status?status=CONFIRMED`,
          {
            method: "PUT",
            headers: {
              accept: "*/*",
            },
          }
        );

        if (updateStatusResponse.status === 200) {
          console.log("Appointment status updated to CONFIRMED");
          navigate("/payment-success");
        } else {
          console.error("Failed to update appointment status");
          alert("Failed to update appointment status");
          navigate("/payment-failure");
        }
      } else {
        console.error("Failed to create payment:", paymentResult.message);
        alert("Failed to create payment: " + paymentResult.message);
        navigate("/payment-failure");
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      alert("An error occurred while processing your payment.");
      navigate("/payment-failure");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    processPayment();
  }, []);

  return (
    <div>
      <h2>
        {isProcessing ? "Processing your payment..." : "Payment Processed"}
      </h2>
      <p>
        {isProcessing
          ? "Please wait while we verify your transaction."
          : "Redirecting you shortly..."}
      </p>
    </div>
  );
};

export default PaymentReturn;
