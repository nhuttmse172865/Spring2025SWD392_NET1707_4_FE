import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE from "../../../../constants/base";
import "./PaymentReturn.css";

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
      navigate("/payment-failure");
      setIsProcessing(false);
      return;
    }

    try {
      const paymentResponse = await fetch(
        `${BASE.BASE_URL}/payment/create`,
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
        const updateStatusResponse = await fetch(
          `${BASE.BASE_URL}/appointments/${paymentData.appointmentId}/status?status=CONFIRMED`,
          {
            method: "PUT",
            headers: {
              accept: "*/*",
            },
          }
        );

        if (updateStatusResponse.status === 200) {
          navigate("/payment-success");
        } else {
          navigate("/payment-failure");
        }
      } else {
        navigate("/payment-failure");
      }
    } catch (error) {
      navigate("/payment-failure");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    processPayment();
  }, []);

  return (
<div className={`payment-status ${isProcessing ? "processing" : "completed"}`}>
  <h2>{isProcessing ? "Processing your payment..." : "Payment Processed"}</h2>
  <p>{isProcessing ? "Please wait while we verify your transaction." : "Redirecting you shortly..."}</p>
</div>
  );
};

export default PaymentReturn;
