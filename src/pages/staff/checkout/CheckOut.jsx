import React, { useEffect, useState } from "react";
import "./CheckOut.css"; 
import { FaQrcode } from "react-icons/fa";
import { Button, Form, Input, Modal ,Spin,DatePicker ,Pagination} from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import BASE from "../../../constants/base";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
const CheckIn = () => {
 
  const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
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
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  useEffect(() => {
    return () => {
     
      localStorage.removeItem('pendingDetailId');
    };
  }, []);
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/appointments/getAll`, {
        // params: { page: currentPage - 1, size: pageSize },
      });
      setProducts(res.data.data.content);
      console.log(res.data.data.content)
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const filterAppointmentsByDate = () => {
    const filtered = products.filter((product) =>
        product.appointment_details.some((detail) =>
            dayjs(detail.day).isSame(selectedDate, "day")
        ) && product?.account?.phone?.includes(searchPhone)
    );
    setFilteredProducts(filtered);
};





  const handleCheckOutCancel = () => {
    setIsCheckOutModalVisible(false);
    setSelectedProduct(null);
    localStorage.removeItem('pendingDetailId'); 
  };

 const showAppointmentDetail = (product) =>{
  setSelectedProduct(product);
    setIsCheckOutModalVisible(true);

 }
 const handleTransfer = async (detail) => {
  if (!selectedProduct || !detail) return;

  const appointmentId = selectedProduct.id; 
  const appointment_detailsId = detail.id;
  const amount = detail.price * 25000; 
  const returnUrl = encodeURIComponent("http://localhost:5173/staff/checkout");

  //save local
  localStorage.setItem('pendingDetailId', detail.id);
  const fullUrl = `${BASE.BASE_URL}/vnpay/create-payment-url?appointmentId=${appointmentId}&detailId=${detail.id}&amount=${amount}&returnUrl=${returnUrl}`;
  console.log("Generated API URL:", fullUrl);

  try {
    const response = await axios.get(
      `${BASE.BASE_URL}/vnpay/create-payment-url?appointmentId=${appointmentId}&detailId=${detail.id}&amount=${amount}&returnUrl=${returnUrl}`
    );
    

    console.log("VNPay response:", response);
    if (response.data.data) {
     
      setTimeout(() => {
        window.location.href = response.data.data;
      }, 5000); 
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
    
    // Get the detail ID from localStorage instead of URL params
    const detailId = parseInt(localStorage.getItem('pendingDetailId'));
    
    // Validate detailId
    if (isNaN(detailId)) {
      console.error("Invalid detail ID retrieved from localStorage:", localStorage.getItem('pendingDetailId'));
      
      return;
    }

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
        console.log("Payment saved successfully, updating appointment detail...");
       
        // Get updated products
        const updatedProducts = await axios.get(`${BASE.BASE_URL}/appointments/getAll`).then(res => res.data.data.content);
        setProducts(updatedProducts);
        
        // Find the selected product
        const selectedProduct = updatedProducts.find((p) => p.id === appointmentId);
       
        if (selectedProduct) {
          // Only update the specific detail that was paid for
          console.log(`Updating appointment detail: ${detailId}`);
          try {
            const response = await axios.put(`${BASE.BASE_URL}/appointment-detail/checkout/${detailId}`);
            console.log(`Updated appointment detail ${detailId} response:`, response.data);
            
            // Clear the localStorage after successful update
            localStorage.removeItem('pendingDetailId');
            
          } catch (error) {
            console.error(`Error updating appointment detail ${detailId}:`, error.response ? error.response.data : error.message);
          }
        } else {
          console.error("Selected product not found, cannot update appointment details.");
        }

        Modal.success({
          title: "Payment Successful",
          content: "The appointment has been checked out successfully!",
        });

        fetchAppointments();
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


const handleCashPayment = async (detail) => {
  if (!selectedProduct || !detail) return;
  
  try {
 
    const paymentResponse = await axios.post(`${BASE.BASE_URL}/payment/create`, {
      appointmentId: selectedProduct.id,
      amount: detail.price * 25000, 
      transactionCode: "14837441", 
      method: "CASH", 
      payTime: "20250309213832",
      responseCode: "00" 
    });
    
    console.log("Cash payment response:", paymentResponse);
    
    if (paymentResponse.status === 201) {
      // Now update the appointment detail status
      console.log(`Updating appointment detail: ${detail.id}`);
      const response = await axios.put(`${BASE.BASE_URL}/appointment-detail/checkout/${detail.id}`);
      console.log(`Updated appointment detail ${detail.id} response:`, response.data);
      
      // Show success message
      Modal.success({
        title: "Payment Successful",
        content: "The appointment has been checked out successfully with cash payment!",
      });
      
      // Update the products list and close the modal
      await fetchAppointments();
      handleCheckOutCancel();
    }
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
        <Input
            placeholder="Search by phone..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
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
            <th>Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.account.name}</td>
                    <td>{product.service.name}</td>
                    <td>{product.account.phone}</td>
                    <td>{product.total} $</td>
                    <td>{dayjs(product.appointment_details[0].day).format("YYYY-MM-DD")}</td>
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
{selectedProduct && selectedProduct.appointment_details.length > 0 ? (
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

        <p><strong>Price:</strong> {detail.price} $</p>
        <p><strong>Start:</strong> {detail.startHour}</p>
        <p><strong>End:</strong> {detail.endHour}</p>
        <p><strong>Day:</strong> {detail.day}</p>
    <div className="btn-action-checkinout">
      
   
    <Button
  key="checkout"
  className="checkout-confirm-btn"
  type="primary"
  onClick={() => handleCashPayment(detail)}
  disabled={detail.status === "COMPLETED" || detail.status === "PENDING"}
>
  Cash
</Button>
    <Button
            className="checkout-confirm-btn"
            type="primary"
            onClick={() => handleTransfer(detail)}
            style={{ marginLeft: "10px" }}
            disabled={detail.status === "COMPLETED" || detail.status === "PENDING"}
          >
            Pay 
          </Button>
    </div>
        
       
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
