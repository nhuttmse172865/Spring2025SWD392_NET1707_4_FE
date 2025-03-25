import React, { useState, useEffect } from "react";
import BASE from "../../../../../constants/base";
import "./ContentModal.css";
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../constants/localStorageName";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ContentModal = ({ appointment }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [customer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const [countdowns, setCountdowns] = useState([]);
  const navigate = useNavigate();

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
              therapist: detail.therapist, // Keep the full therapist object
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

  const handleViewTherapist = (therapist) => {
    navigate(`/customer-view/therapist/${therapist.id}`, {
      state: { therapist: therapist },
    });
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
                    {detail.status === "COMPLETED" && detail.therapist && (
                      <button
                        className="feedback-btn"
                        onClick={() => handleViewTherapist(detail.therapist)}
                      >
                        Feedback Therapist
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
    </div>
  );
};

export default ContentModal;
