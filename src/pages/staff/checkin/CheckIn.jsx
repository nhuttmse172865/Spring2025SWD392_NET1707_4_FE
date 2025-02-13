import React, { useState } from "react";
import "./CheckIn.css"; // Import file CSS
import { FaQrcode } from "react-icons/fa";
import { Button, Form, Input, Modal } from "antd";
const CheckIn = () => {
  const [form] = Form.useForm();
  const [isCheckInModalVisible, setIsCheckInModalVisible] = useState(false);
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
 const showModal = () => {
  setIsCheckInModalVisible(true);
  form.resetFields();
  }
  const handleCheckInCancel = () => {
    setIsCheckInModalVisible(false);
  };
  const handleSubmit = () =>{
    setIsCheckInModalVisible(false);
    form.resetFields();
  }
  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <h1 className="checkin-title">CheckIn</h1>
        <div className="header-actions">
          <button className="btn-checkin" onClick={showModal}>Form Checkin</button>
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
      <Modal
        title="Check-in Form"
        open={isCheckInModalVisible}
        onCancel={handleCheckInCancel}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label="Service"
            name="service"
            rules={[{ required: true, message: "Please enter the service!" }]}
          >
            <Input placeholder="Enter service" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <Input placeholder="Enter price" />
          </Form.Item>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please enter the duration!" }]}
          >
            <Input placeholder="Enter duration" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Check In
            </Button>
          </Form.Item>
        </Form>
      </Modal>


    </div>
  );
};

export default CheckIn;
