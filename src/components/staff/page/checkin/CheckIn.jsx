import React, { useState } from "react";
import "./CheckIn.css"; // Import file CSS
import { FaQrcode } from "react-icons/fa";

const CheckIn = () => {
  // Dữ liệu mẫu thay thế Mock API
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Alice",
      service: "Facial Treatment",
      price: "$50",
      duration: "60 min",
    },
    {
      id: 2,
      name: "Bob",
      service: "Massage Therapy",
      price: "$70",
      duration: "90 min",
    },
    {
      id: 3,
      name: "Charlie",
      service: "Hair Spa",
      price: "$40",
      duration: "45 min",
    },
  ]);

  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <h1 className="checkin-title">CheckIn</h1>
        <div className="header-actions">
          <button className="btn-checkin">Form Checkin</button>
          <FaQrcode className="qr-icon" />
        </div>
      </div>

      <table className="checkin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.service}</td>
              <td>{product.price}</td>
              <td>{product.duration}</td>
              <td>
                <button className="checkout-button">CheckOut</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckIn;
