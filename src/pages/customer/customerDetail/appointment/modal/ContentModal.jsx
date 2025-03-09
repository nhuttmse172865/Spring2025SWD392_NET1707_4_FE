import React, { useState, useEffect } from "react";
import "./ContentModal.css";

const ContentModal = ({ appointment }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch chi tiết appointment từ API
  useEffect(() => {
    if (!appointment) return;

    setLoading(true);
    fetch(`http://localhost:8080/appointments/${appointment.id}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          // Format dữ liệu từ appointment_details
          const formattedDetails = result.data.appointment_details.map(
            (detail) => ({
              detail_id: detail.id,
              appointment_id: appointment.id,
              day: detail.day,
              price: `$${detail.price}`,
              start_hour: detail.startHour.slice(0, 5), // Lấy HH:MM từ HH:MM:SS
              name: detail.name,
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

  // Hàm tính countdown
  const calculateCountdown = (date, time) => {
    const targetTime = new Date(`${date}T${time}`);
    const now = new Date();
    const diff = targetTime - now;

    if (diff <= 0) return "Time's up!";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} days ${hours} hours ${minutes} minutes`;
  };

  // State cho countdown
  const [countdowns, setCountdowns] = useState([]);

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
      }, 60000); // Cập nhật mỗi phút

      return () => clearInterval(interval);
    }
  }, [details]);

  if (!appointment) return null;

  return (
    <div>
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
