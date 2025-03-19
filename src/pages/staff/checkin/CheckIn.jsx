import React, { useEffect, useState } from "react";
import "./CheckIn.css"; 
import { FaQrcode } from "react-icons/fa";
import { Button, Form, Input, Modal ,Spin,DatePicker ,Pagination} from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import BASE from "../../../constants/base";
import dayjs from "dayjs";
const CheckIn = () => {
 
  const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1000;
  const [totalItems, setTotalItems] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  useEffect(() => {
    filterAppointmentsByDate();
  }, [products,searchPhone]); 
useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/appointments/getAll`, {
        params: { page: currentPage -1 , size: pageSize },
      });
      console.log(res.data.data.content);
     setProducts(res.data.data.content);
      setTotalItems(res.data.data.totalElements)
      
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const filterAppointmentsByDate = () => {
    const filtered = products.filter((product) =>
      product?.account?.phone?.includes(searchPhone)
    );
    setFilteredProducts(filtered);
  };
  

 const handleCheckin = async (appointmentDetailId) => {
  try {
    const res = await axios.put(`${BASE.BASE_URL}/appointment-detail/checkin/${appointmentDetailId}`);


    Modal.success({ content: "Check-in Successful!" });

    //cập nhật ds 
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              appointment_details: product.appointment_details?.map((detail) =>
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
      appointment_details: prevProduct.appointment_details?.map((detail) =>
        detail.id === appointmentDetailId
          ? { ...detail, status: "CHECKIN" }
          : detail
      ),
    }));
  } catch (error) {
    console.log(error);
  }
};



  const handleCheckOutCancel = () => {
    setIsCheckOutModalVisible(false);
    setSelectedProduct(null);
  };

  const showAppointmentDetail = async (product) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/appointments/${product.id}`);
      setSelectedProduct(res.data.data); 
      console.log(res.data.data);
      setIsCheckOutModalVisible(true);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
    setLoading(false);
  };
  

  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <div className="header-actions">
          
         
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
        <Input
            placeholder="Search by phone..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          {/* <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date || dayjs())}
            format="YYYY-MM-DD"
          /> */}
       
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
            <th>Day</th>
          <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredProducts.length > 0 ? (
    filteredProducts
      .filter((product) => product.status !== "CANCELLED"&& product.status !=="COMPLETED" ) 
      .map((product) => (
        <tr key={product.id}>
          <td>{product.account.name}</td>
          <td>{product.service.name}</td>
          <td>{product.account.phone}</td>
          <td>{product.total}$</td>
          <td>{dayjs(product.createdTime).format("YYYY-MM-DD")}</td>
          <td>{product.status}</td>
          <td>
            <Button
              className="checkout-button"
              onClick={() => showAppointmentDetail(product)}
            >
              View detail
            </Button>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No appointments found
      </td>
    </tr>
  )}
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
    
      
  ]}
  className="checkout-modal"
>
{selectedProduct && selectedProduct.appointment_details ? (
  selectedProduct.appointment_details.map((detail) => (
    <div key={detail.id} className="appointment-item">
      <p><strong>Service detail:</strong> {detail.name}</p>
      <p><strong>Status:</strong> {detail.status}</p>
      <p><strong>Price:</strong> {detail.price}</p>
      <p><strong>Start:</strong> {detail.startHour}</p>
      <p><strong>End:</strong> {detail.endHour}</p>
      <p><strong>Therapist:</strong> {detail.therapist?.account?.name}</p>
      <p><strong>Day:</strong> {detail.day}</p>
     
      
      <Button
        type="primary"
        onClick={() => handleCheckin(detail.id)}
        disabled={detail.status === "CHECKIN" || detail.status === "COMPLETED" || detail.status === "CANCELLED"}
        className="checkout-cancel-btn "
      >
        {detail.status === "CHECKIN" ? "Checked In" : "Check In"}
      </Button>
    </div>
  ))
) : (
  <p>No appointment details available</p>
)}



</Modal>
  

    </div>
  );
};

export default CheckIn;
