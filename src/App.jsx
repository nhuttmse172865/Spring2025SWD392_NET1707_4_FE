import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import StaffLayout from "./layouts/StaffLayout";
import TherapistLayout from "./layouts/TherapistLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login/Login";
import MainLayout from "./pages/HomePage";
import HomePageForm from "./components/forms/HomePageForm/HomePageForm";
import Service from "./pages/Service/Service";
import HomePageLayout from "./pages/HomePageLayout";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />} >
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Service />} />
        </Route>

        <Route path="/" element={<HomePageLayout />} />
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
