import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import StaffLayout from "./layouts/StaffLayout";
import TherapistLayout from "./layouts/TherapistLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
       <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/customer" element={<CustomerLayout />} />
        <Route path="/staff" element={<StaffLayout />} />
        <Route path="/therapist" element={<TherapistLayout />} />
        <Route path="/manager" element={<ManagerLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
