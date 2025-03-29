import React, { useEffect, useState } from "react";
import "./CheckIn.css";
import { FaQrcode } from "react-icons/fa";
import { Button, Form, Input, Modal, Spin, DatePicker, Pagination } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";
import BASE from "../../../constants/base";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useSearchParams } from "react-router-dom";
const CheckIn = () => {
  dayjs.extend(isBetween);
  const [isCheckOutModalVisible, setIsCheckOutModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;
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
    filterAppointmentsByDate();
  }, [products, searchPhone]);
  useEffect(() => {
    if (searchParams.get("vnp_ResponseCode")) {
      handleSavePayment();
    }
  }, [searchParams]);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE.BASE_URL}/appointments/getAll`, {
        params: { page: currentPage - 1, size: pageSize },
      });
      console.log(res.data.data.content);
      setProducts(res.data.data.content);
      setTotalItems(res.data.data.totalElements);
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
  const handleCashPayment = async (detail) => {
    if (!selectedProduct || !detail) return;
  
    try {
      const paymentResponse = await axios.post(`${BASE.BASE_URL}/payment/create`, {
        appointmentId: selectedProduct.id,
        amount: detail.price * 25000 * 0.4,
        transactionCode: "14837441",
        method: "CASH",
        payTime: "20250309213832",
        responseCode: "00",
      });
  
      console.log("Cash payment response:", paymentResponse);
  
      if (paymentResponse.status === 201) {
        // Kiểm tra nếu detail.price tồn tại và hợp lệ, thì gọi handleCheckin
        if (detail.price && detail.price > 0) {
          await handleCheckin(detail.id); // Gọi API check-in
        } else {
          console.log("Không gọi check-in vì detail.price không hợp lệ:", detail.price);
          // Cập nhật trạng thái mà không cần check-in
          const response = await axios.put(`${BASE.BASE_URL}/appointment-detail/checkin/${detail.id}`);
          console.log(`Updated appointment detail ${detail.id} response:`, response.data);
        }
  
        // Show success message
        Modal.success({
          title: "Payment Successful",
          content: "The appointment has been checked in successfully with cash payment!",
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
  const handleCheckin = async (appointmentDetailId) => {
    try {
      const res = await axios.put(
        `${BASE.BASE_URL}/appointment-detail/checkin/${appointmentDetailId}`
      );

      Modal.success({ content: "Check-in Successful!" });

      //cập nhật ds
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                appointment_details: product.appointment_details?.map(
                  (detail) =>
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
      const res = await axios.get(
        `${BASE.BASE_URL}/appointments/${product.id}`
      );
      setSelectedProduct(res.data.data);
      console.log(res.data.data);
      setIsCheckOutModalVisible(true);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
    setLoading(false);
  };
  const handleTransfer = async (detail) => {
    if (!selectedProduct || !detail) return;
  
    const appointmentId = selectedProduct.id;
    const appointment_detailsId = detail.id;
    const amount = detail.price * 25000 * 0.4;
    const returnUrl = encodeURIComponent(
      `${BASE.BASE_MY_HOST}/staff/checkin` // Changed from checkout to checkin
    );
    
    console.log("Selected Product ID:", selectedProduct?.id);
    console.log("Detail ID:", detail?.id);
    console.log("Amount:", amount);
    
    // Save local
    localStorage.setItem('pendingDetailId', detail.id);
    const fullUrl = `${BASE.BASE_URL}/vnpay/create-payment-url?appointmentId=${appointmentId}&detailId=${detail.id}&amount=${amount}&returnUrl=${returnUrl}`;
    console.log("Generated API URL:", fullUrl);
  
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/vnpay/create-payment-url?appointmentId=${appointmentId}&detailId=${detail.id}&amount=${amount}&returnUrl=${returnUrl}`
      );
      
      console.log("VNPay full response:", response.data);
  
      if (response.data.data) {
        setTimeout(() => {
          window.location.href = response.data.data;
        }, 2000);
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
  
      const detailId = parseInt(localStorage.getItem("pendingDetailId"));
  
      if (isNaN(detailId)) {
        console.error("Invalid detail ID retrieved from localStorage:", localStorage.getItem("pendingDetailId"));
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
  
          const appointmentResponse = await axios.get(`${BASE.BASE_URL}/appointments/${appointmentId}`);
          const selectedProduct = appointmentResponse.data.data;
  
          if (selectedProduct) {
            const detail = selectedProduct.appointment_details.find(d => d.id === detailId);
            if (detail) {
              // Kiểm tra nếu detail.price tồn tại và hợp lệ, thì gọi handleCheckin
              if (detail.price && detail.price > 0) {
                await handleCheckin(detailId); // Gọi API check-in
              } else {
                console.log("Không gọi check-in vì detail.price không hợp lệ:", detail.price);
                const response = await axios.put(`${BASE.BASE_URL}/appointment-detail/checkin/${detailId}`);
                console.log(`Updated appointment detail ${detailId} response:`, response.data);
              }
              localStorage.removeItem("pendingDetailId");
            } else {
              console.error("Detail not found for ID:", detailId);
            }
          } else {
            console.error("Selected product not found, cannot update appointment details.");
          }
  
          Modal.success({
            title: "Payment Successful",
            content: "The appointment has been checked in successfully!",
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
  
  return (
    <div className="checkin-container">
      <div className="checkin-header">
        <div className="header-actions"></div>

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
          <Spin size="large" />
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
                  .filter(
                    (product) =>
                      product.status !== "CANCELLED" &&
                      product.status !== "COMPLETED"
                  )
                  .sort(
                    (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
                  )
                  .map((product) => (
                    <tr key={product.id}>
                      <td>{product.account.name}</td>
                      <td>{product.service.name}</td>
                      <td>{product.account.phone}</td>
                      <td>${product.total}</td>
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
            showSizeChanger={false}
          />
        </>
      )}
      <Modal
  title="Information"
  open={isCheckOutModalVisible}
  onCancel={handleCheckOutCancel}
  footer={[
    <Button
      key="cancel"
      className="checkout-cancel-btn"
      onClick={handleCheckOutCancel}
    >
      Cancel
    </Button>,
  ]}
  className="checkout-modal"
>
  {selectedProduct && selectedProduct.appointment_details ? (
    selectedProduct.appointment_details
      .sort((a, b) => new Date(a.startHour) - new Date(b.startHour))
      .map((detail, index, arr) => {
        const previousCheckedIn =
          index === 0 || arr[index - 1].status === "CHECKIN";
        const isDisabled =
          detail.status === "CHECKIN" ||
          detail.status === "COMPLETED" ||
          detail.status === "CANCELLED" ||
          !previousCheckedIn ||
          dayjs(detail.day).format("YYYY-MM-DD") !==
            dayjs().format("YYYY-MM-DD") ||
          !dayjs().isBetween(
            dayjs(`${detail.day} ${detail.startHour}`).subtract(15, "minute"),
            dayjs(`${detail.day} ${detail.startHour}`).add(15, "minutes")
          );

        return (
          <div key={detail.id} className="appointment-item">
            <p>
              <strong>Service detail:</strong> {detail.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    detail.status === "COMPLETED"
                      ? "green"
                      : detail.status === "CHECKIN"
                      ? "red"
                      : "black",
                }}
              >
                {detail.status}
              </span>
            </p>
            <p>
              <strong>Price:</strong> ${detail.price}
            </p>
            <p>
              <strong>Start:</strong> {detail.startHour}
            </p>
            <p>
              <strong>End:</strong> {detail.endHour}
            </p>
            <p>
              <strong>Therapist:</strong> {detail.therapist?.account?.name}
            </p>
            <p>
              <strong>Day:</strong> {detail.day}
            </p>

            {/* Điều kiện hiển thị nút dựa trên detail.price */}
            {detail.price === 0 ? (
              <Button
                type="primary"
                onClick={() => handleCheckin(detail.id)} // Gọi trực tiếp handleCheckin
                disabled={isDisabled}
                className="checkout-cancel-btn"
              >
                Checkin
              </Button>
            ) : (
              <>
                <Button
                  type="primary"
                  onClick={() => handleCashPayment(detail)}
                  disabled={isDisabled}
                  className="checkout-cancel-btn"
                >
                  Cash
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  type="primary"
                  onClick={() => handleTransfer(detail)}
                  disabled={isDisabled}
                  className="checkout-cancel-btn"
                >
                  Pay
                </Button>
              </>
            )}
          </div>
        );
      })
  ) : (
    <p>No appointment details available</p>
  )}
</Modal>
    </div>
  );
};

export default CheckIn;
