
import React, { useState, useEffect } from "react";
import BASE from "../../../../../constants/base";
import "./ContentModal.css";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../constants/localStorageName";
import "react-toastify/dist/ReactToastify.css";

const ContentModal = ({ appointment }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [customer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(new Set());
  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    if (customer) {
      try {
        const token = customer;
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join("")
        );
        const decodedData = JSON.parse(jsonPayload);
        setAccountId(decodedData.accountId);
      } catch (error) {
        console.error("Invalid JWT Token", error);
      }
    }
  }, [customer]);

  useEffect(() => {
    if (!appointment) return;

    setLoading(true);
    fetch(`${BASE.BASE_URL}/appointments/${appointment.id}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          const formattedDetails = result.data.appointment_details.map(
            (detail) => ({
              detail_id: detail.id,
              appointment_id: appointment.id,
              day: detail.day,
              price: `$${detail.price}`,
              start_hour: detail.startHour.slice(0, 5),
              name: detail.name,
              status: detail.status,
              therapist_name: detail.therapist?.account.name || "N/A",
            })
          );
          setDetails(formattedDetails);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load appointment details");
        setLoading(false);
        console.error(err);
      });
  }, [appointment]);

  useEffect(() => {
    if (details.length > 0) {
      setCountdowns(
        details.map((detail) => ({
          detail_id: detail.detail_id,
          timeLeft: calculateCountdown(detail.day, detail.start_hour),
        }))
      );

      const interval = setInterval(() => {
        setCountdowns(
          details.map((detail) => ({
            detail_id: detail.detail_id,
            timeLeft: calculateCountdown(detail.day, detail.start_hour),
          }))
        );
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [details]);

  const calculateCountdown = (date, time) => {
    const targetTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = targetTime - now;

    if (diff <= 0) return "Time's up!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const openFeedbackModal = (detailId) => {
    setSelectedDetailId(detailId);
    setShowFeedbackModal(true);
    setRating(0);
    setFeedbackText("");
  };

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);
    setSelectedDetailId(null);
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!feedbackText.trim()) {
      toast.error("Please provide feedback text");
      return;
    }
    const selectedDetail = details.find(
      (detail) => detail.detail_id === selectedDetailId
    );
    const requestBody = {
      content: feedbackText,
      rating: rating,
      customerId: accountId,
      serDetailName: selectedDetail?.name,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${BASE.BASE_URL}/feedback/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      toast.success("Feedback submitted successfully!");
      setFeedbackSubmitted((prev) => new Set(prev).add(selectedDetailId));
      closeFeedbackModal();
    } catch (error) {
      toast.error("Failed to submit feedback");
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!appointment) return null;

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {loading ? (
        <p>Loading details...</p>
      ) : error ? (
        <p>{error}</p>
      ) : details.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>Countdown</th>
                <th>Price</th>
                <th>Status</th>
                <th>Therapist</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {details.map((detail) => (
                <tr key={detail.detail_id}>
                  <td>{detail.name}</td>
                  <td>{detail.day}</td>
                  <td>{detail.start_hour}</td>
                  <td>
                    {countdowns.find((c) => c.detail_id === detail.detail_id)
                      ?.timeLeft || "N/A"}
                  </td>
                  <td>{detail.price}</td>
                  <td>{detail.status}</td>
                  <td>{detail.therapist_name}</td>
                  <td>
                    {detail.status === "COMPLETED" && (
                      <button
                        className={`feedback-btn ${
                          feedbackSubmitted.has(detail.detail_id)
                            ? "disabled"
                            : ""
                        }`}
                        onClick={() => openFeedbackModal(detail.detail_id)}
                        disabled={feedbackSubmitted.has(detail.detail_id)}
                      >
                        Feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No appointment details available.</p>
      )}

      {showFeedbackModal && (
        <div className="feedback-modal-overlay">
          <div className="feedback-modal">
            <button className="close-btn" onClick={closeFeedbackModal}>
              ×
            </button>
            <h2>We need your feedback</h2>
            <p>How would you rate your experience with the app today?</p>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? "filled" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Write your note"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="feedback-textarea"
            />
            <button
              className="submit-btn"
              onClick={handleSubmitFeedback}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModal;
