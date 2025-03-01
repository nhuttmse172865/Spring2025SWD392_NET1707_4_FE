import React, { useEffect, useState } from "react";
import "./CheckIn.css"; 
import { FaQrcode } from "react-icons/fa";
import { Button, Form, Input, Modal ,Spin ,Pagination} from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import BASE from "../../../constants/base";

const CheckIn = () => {
 
  const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([
   
  ]);
 useEffect(()=>{
  const fectchAppointments = async () =>{
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/appointments/getAll`, {
        params: { page: currentPage - 1, size: pageSize },
      });
      setProducts(res.data.data.content);
      setTotalItems(res.data.data.totalElements);
    }
    catch (error) {
    console.log(error)
   }
   setLoading(false);
  }
  fectchAppointments();
 },[currentPage])

 const handleCheckin = async (appointmentDetailId) => {
  try {
    const res = await axios.put(
      `${BASE.BASE_URL}/appointment-detail/checkin`,
      null,
      { params: { appointmentDetailId } }
    );

    Modal.success({ content: "Check-in Successful!" });

    //cập nhật ds 
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              appointment_details: product.appointment_details.map((detail) =>
                detail.id === appointmentDetailId
                  ? { ...detail, status: "CHECKIN" } 
                  : detail
              ),
            }
          : product
      )
    );

    //cập nhật nút checkin
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      appointment_details: prevProduct.appointment_details.map((detail) =>
        detail.id === appointmentDetailId
          ? { ...detail, status: "CHECKIN" }
          : detail
      ),
    }));
  } catch (error) {
    console.log(error);
  }
};

  const showCheckOutModal = (product) => {
    setSelectedProduct(product);
    setIsCheckOutModalVisible(true);
  };

  const handleCheckOutCancel = () => {
    setIsCheckOutModalVisible(false);
    setSelectedProduct(null);
  };

 const showAppointmentDetail = (product) =>{
  setSelectedProduct(product);
    setIsCheckOutModalVisible(true);
 }
 const handleCloseModal = () => {
  setIsCheckOutModalVisible(false);
  setSelectedProduct(null);
};
  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <div className="header-actions">
          
         
        </div>
      </div>
{loading ? ( 
  <div className="loading-container">
    <Spin size="large"/>
  </div>
) : (
 
 <>
 <table className="checkin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Phone</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.account.name}</td>
              <td>{product.service.name}</td>
              <td>{product.account.phone}</td>
              <td>{product.total}</td> 
              
              <td>
                <button
                  className="checkout-button"
                  onClick={() => showAppointmentDetail(product)}
                >
                  View detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       
       <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: "20px", textAlign: "center" }}
          />
 </>
)}
      
     

     
      <Modal
  title="Information"
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
       CheckOut
    </Button>,
      
  ]}
  className="checkout-modal"
>
{selectedProduct && selectedProduct.appointment_details.length > 0 ? (
  <div className="checkout-info">
    {selectedProduct.appointment_details.map((detail) => (
      <div key={detail.id} className="appointment-item">
        <p><strong>Service detail:</strong> {detail.name}</p>
        <p><strong>Status:</strong> {detail.status}</p>
        <p><strong>Price:</strong> {detail.price}</p>
        <p><strong>Start:</strong> {detail.startHour}</p>
        <p><strong>End:</strong> {detail.endHour}</p>

      
        <Button
          type="primary"
          className="checkout-confirm-btn"
          onClick={() => handleCheckin(detail.id)}
          disabled={detail.status === "CHECKIN"} 
        >
          {detail.status === "CHECKIN" ? "Checked In" : "Check In"}
        </Button>
        
       
      </div>
    ))}
  </div>
) : (
  <p>No appointment details available</p>
)}


</Modal>
  

    </div>
  );
};

export default CheckIn;
