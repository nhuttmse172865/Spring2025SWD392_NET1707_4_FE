import React, { useEffect, useState } from "react";
import "./CheckOut.css"; 
import { FaQrcode } from "react-icons/fa";
import { Button, Form, Input, Modal ,Spin,DatePicker ,Pagination} from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import BASE from "../../../constants/base";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
const process = import.meta.env.VITE_APP_TUVAN;

const CheckOutTherapist = () => {
 
  const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;
  const [totalItems, setTotalItems] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const tuVanServices = JSON.parse(process || "[]");
  const [searchParams] = useSearchParams();
  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);
  useEffect(() => {
    handleSavePayment();
  }, [searchParams]);
  // useEffect(() => {
  //   filterAppointmentsByDate();
  // }, [selectedDate, products,searchPhone]); 
  // useEffect(() => {
  //   setFilteredProducts(products);
  //   console.log(filteredProducts)
  // }, [products]);
   useEffect(() => {
      filterAppointmentsByDate();
    }, [products,searchPhone]); 
  useEffect(() => {
    return () => {
     
      localStorage.removeItem('pendingDetailId');
    };
  }, []);
  const filterAppointmentsByDate = () => {
    const filtered = products.filter((product) =>
     
         product?.account?.phone?.includes(searchPhone)
    );
    setFilteredProducts(filtered);
};
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/appointments/getAll`, {
        params: { page: currentPage - 1, size: pageSize },
      });
      setProducts(res.data.data.content);
      console.log(res.data.data.content);
      setTotalItems(res.data.data.totalElements);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };






  const handleCheckOutCancel = () => {
    setIsCheckOutModalVisible(false);
    setSelectedProduct(null);
    localStorage.removeItem('pendingDetailId'); 
  };

  const showAppointmentDetail = async (product) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/appointments/${product.id}`);
      setSelectedProduct(res.data.data); 
      setIsCheckOutModalVisible(true);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
    setLoading(false);
  };
  const handleTransfer = async (appointmentId) => {
    if (!selectedProduct) return;
    
    const tuVanServices = JSON.parse(process || "[]");
    const isTuVanService = tuVanServices.includes(selectedProduct.service.name);
    
    // Calculate amount based on the appointment total
    const amount = isTuVanService ? selectedProduct.total * 25000 * 0.1 : selectedProduct.total * 25000 * 0.1;
    const returnUrl = encodeURIComponent(
  window.location.hostname === "localhost"
    ? "http://localhost:5173/staff/checkoutTherapist"
    : "http://34.126.143.212/staff/checkoutTherapist"
);

  
    // Store the appointment ID in localStorage
    localStorage.setItem('pendingAppointmentId', appointmentId);
    
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/vnpay/create-payment-url?appointmentId=${appointmentId}&amount=${amount}&returnUrl=${returnUrl}`
      );
      
      console.log("VNPay response:", response);
      if (response.data.data) {
        window.location.href = response.data.data;
      } else {
        console.error("Không lấy được payment URL", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSavePayment = async () => {
    const vnp_responseCode = searchParams.get("vnp_ResponseCode");
    
    if (vnp_responseCode === "00") {
      const appointmentId = parseInt(searchParams.get("vnp_OrderInfo"));
      const amount = parseInt(searchParams.get("vnp_Amount")) / 100;
      const transactionCode = searchParams.get("vnp_TransactionNo");
      const method = searchParams.get("vnp_CardType");
      const payTime = searchParams.get("vnp_PayDate");
      
      try {
        const paymentResponse = await axios.post(`${BASE.BASE_URL}/payment/create`, {
          appointmentId,
          amount,
          transactionCode,
          method,
          payTime,
          responseCode: vnp_responseCode,
        });
  
        console.log("Payment save response:", paymentResponse);
  
        if (paymentResponse.status === 201) {
          console.log("Payment saved successfully");
          
          // Get updated products
          await fetchAppointments();
          
          Modal.success({
            title: "Payment Successful",
            content: "The appointment has been checked out successfully!",
          });
        } else {
          console.error("Payment save failed:", paymentResponse.data);
          Modal.error({
            title: "Payment Failed",
            content: "There was an issue processing the payment.",
          });
        }
      } catch (error) {
        console.error("Error saving payment:", error.response ? error.response.data : error.message);
        Modal.error({
          title: "Payment Failed",
          content: "There was an issue processing the payment.",
        });
      }
    }
  };


  const handleCashPayment = async (appointmentId) => {
    if (!selectedProduct) return;
    
    try {
     
      const tuVanServices = JSON.parse(process || "[]");
      const isTuVanService = tuVanServices.includes(selectedProduct.service.name);
      const amount = isTuVanService ? selectedProduct.total * 25000 * 0.1 : selectedProduct.total * 25000 * 0.1;
      
      const paymentResponse = await axios.post(`${BASE.BASE_URL}/payment/create`, {
        appointmentId: appointmentId,
        amount: amount,
        transactionCode: "14837441", 
        method: "CASH", 
        payTime: dayjs().format("YYYYMMDDHHmmss"),
        responseCode: "00" 
      });
      
      console.log("Cash payment response:", paymentResponse);
      
   
      await fetchAppointments();
      handleCheckOutCancel();
      
      Modal.success({
        title: "Payment Successful",
        content: "Cash payment has been processed successfully!",
      });
    } catch (error) {
      console.error("Error processing cash payment:", error.response ? error.response.data : error.message);
      Modal.error({
        title: "Payment Failed",
        content: "There was an issue processing the cash payment.",
      });
    }
  };

  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <div className="header-actions">
          
         
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
       
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date || dayjs())}
            format="YYYY-MM-DD"
          />
       
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
            <th>Status</th>
            <th>Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredProducts.length > 0 ? (
    filteredProducts
      .filter((product) => {
        
        return tuVanServices.includes(product.service?.name);
      }) .filter((product) => product.status !== "COMPLETED")
      .map((product) => (
        <tr key={product.id}>
          <td>{product.account.name}</td>
          <td>{product.service?.name || "No Service"}</td>
          <td>{product.account.phone}</td>
          <td>${product.total}</td>
          <td>{product.status}</td>
          <td>{dayjs(product.createdTime).format("YYYY-MM-DD")}</td>
          <td>
            <div className="btn-action-checkinout">
              <Button
                className="checkout-button"
                style={{ gap: "10px" }}
                onClick={() => showAppointmentDetail(product)}
              >
                View detail
              </Button>
            </div>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="7" style={{ textAlign: "center" }}>
        No matching appointments found
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
            showSizeChanger={false} 
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
    <Button  key="cash" type="default" onClick={() => handleCashPayment(selectedProduct.id)}  >
      Cash Payment
    </Button>,
    <Button key="pay" type="primary" onClick={() => handleTransfer(selectedProduct.id)}>
      Online Payment
    </Button>
  ]}
  className="checkout-modal"
>
{selectedProduct && selectedProduct.appointment_details ? (
  <div className="checkout-info">
    {selectedProduct.appointment_details.map((detail) => (
      <div key={detail.id} className="appointment-item">
        <p><strong>Service detail:</strong> {detail.name}</p>
        <p>
  <strong>Status: </strong> 
  <span style={{ color: detail.status === "COMPLETED" ? "green" : detail.status === "CHECKIN" ? "red" : "black" }}>
    {detail.status}
  </span>
</p>

        <p><strong>Price:</strong> ${detail.price}</p>
        <p><strong>Start:</strong> {detail.startHour}</p>
        <p><strong>End:</strong> {detail.endHour}</p>
        <p><strong>Day:</strong> {detail.day}</p>
        <p><strong>Therapist:</strong> {detail.therapist?.account?.name}</p>
   
        
       
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

export default CheckOutTherapist;