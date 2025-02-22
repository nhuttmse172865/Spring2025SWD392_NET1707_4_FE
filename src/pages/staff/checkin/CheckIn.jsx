import React, { useEffect, useState } from "react";
import "./CheckIn.css"; 
import { FaQrcode } from "react-icons/fa";
import { Button, Form, Input, Modal } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
const CheckIn = () => {
  const [form] = Form.useForm();
  const [isCheckInModalVisible, setIsCheckInModalVisible] = useState(false);
  const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);
  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const showCheckInModal = () => {
    setIsCheckInModalVisible(true);
    form.resetFields();
  };

  const handleCheckInCancel = () => {
    setIsCheckInModalVisible(false);
  };

  const handleCheckInSubmit = () => {
    setIsCheckInModalVisible(false);
    form.resetFields();
  };

  const showCheckOutModal = (product) => {
    setSelectedProduct(product);
    setIsCheckOutModalVisible(true);
  };

  const handleCheckOutCancel = () => {
    setIsCheckOutModalVisible(false);
    setSelectedProduct(null);
  };
  const showQRModal = () =>{
    setIsQRModalVisible(true);
  }
  const handleQRCancel = () => setIsQRModalVisible(false);
  useEffect(()=>{
     if(isQRModalVisible){
      const scanner = new Html5QrcodeScanner("reader", { qrbox: { width: 250, height: 250 }, fps: 10 })
     scanner.render((result)=>{
        setScanResult(result);
        setIsQRModalVisible(false);
        scanner.clear(); 
     },
     (error) =>console.log("QR error",error)
    );
    return () => scanner.clear();
    }
  },[isQRModalVisible])
  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <div className="header-actions">
          <button className="btn-checkinn" onClick={showCheckInModal}>
            Form Checkin
          </button>
          {/* <FaQrcode onClick={showQRModal} style={{ cursor: "pointer", fontSize: "24px" }} className="qr-icon" /> */}
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
                <button
                  className="checkout-button"
                  onClick={() => showCheckOutModal(product)}
                >
                  CheckOut
                </button>
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
            <Button className="checkout-confirm-btn"type="primary" onClick={handleCheckInSubmit}>
              Check In
            </Button>
          </Form.Item>
        </Form>
      </Modal>

     
      <Modal
  title="Check-out Information"
  open={isCheckOutModalVisible}
  onCancel={handleCheckOutCancel}
  footer={[
    <Button key="cancel" className="checkout-cancel-btn" onClick={handleCheckOutCancel}>
      Cancel
    </Button>,
    <Button
      key="checkout"
      className="checkout-confirm-btn"
      type="primary"
      onClick={() => {
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        handleCheckOutCancel();
      }}
    >
      Confirm CheckOut
    </Button>,
  ]}
  className="checkout-modal"
>
  {selectedProduct && (
    <div className="checkout-info">
      <p><strong>Name:</strong> {selectedProduct.name}</p>
      <p><strong>Service:</strong> {selectedProduct.service}</p>
      <p><strong>Price:</strong> {selectedProduct.price}</p>
      <p><strong>Duration:</strong> {selectedProduct.duration}</p>
    </div>
  )}
</Modal>
    {/* Model QR */}
 <Modal title="Scan QR Code" open={isQRModalVisible} onCancel={handleQRCancel} footer={null}>
        <div id="reader"></div>
        {scanResult && <p>Scanned QR Code: {scanResult}</p>}
      </Modal>
    </div>
  );
};

export default CheckIn;
