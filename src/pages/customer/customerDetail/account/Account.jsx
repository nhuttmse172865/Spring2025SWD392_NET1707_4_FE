import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";
import "./Account.css";
import BASE from "../../../../constants/base";

const Account = () => {
  const [customer] = useLocalStorage(
    LOCALSTORAGE_NAME.CUSTOMER_INFORMATION_CACHE,
    ""
  );
  const [accountId, setAccountId] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    name: "",
    phone: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setError("Failed to decode token");
      }
    }
  }, [customer]);

  useEffect(() => {
    if (accountId) {
      fetchAccountInfo();
    }
  }, [accountId]);

  const fetchAccountInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE.BASE_URL}/info/${accountId}`);
      const data = await response.json();
      if (data.status === 200) {
        setAccountInfo(data.data);
        setFormData({
          password: "",
          name: data.data.name,
          phone: data.data.phone,
          gender: data.data.gender,
        });
      }
    } catch (error) {
      setError("Failed to fetch account information");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE.BASE_URL}/update/${accountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setIsEditing(false);
        fetchAccountInfo();
      }
    } catch (error) {
      setError("Failed to update account information");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="acc-loading">Loading...</div>;
  if (error) return <div className="acc-error">{error}</div>;
  if (!accountInfo) return <div className="acc-empty">No account information available</div>;

  return (
    <div className="acc-container">
      <h2 className="acc-title">Account Profile</h2>
      
      {!isEditing ? (
        <div className="acc-info-card">
          <div className="acc-info-row">
            <span className="acc-label">Name:</span>
            <span className="acc-value">{accountInfo.name}</span>
          </div>
          <div className="acc-info-row">
            <span className="acc-label">Email:</span>
            <span className="acc-value">{accountInfo.email}</span>
          </div>
          <div className="acc-info-row">
            <span className="acc-label">Phone:</span>
            <span className="acc-value">{accountInfo.phone}</span>
          </div>
          <div className="acc-info-row">
            <span className="acc-label">Gender:</span>
            <span className="acc-value">{accountInfo.gender}</span>
          </div>
          <button
            className="acc-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="acc-form" onSubmit={handleSubmit}>

          <div className="acc-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="acc-form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone"
            />
          </div>
          <div className="acc-form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="acc-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
          </div>
          <div className="acc-form-actions">
            <button type="submit" className="acc-save-btn">
              Save Changes
            </button>
            <button
              type="button"
              className="acc-cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Account;