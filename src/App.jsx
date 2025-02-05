import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import StaffLayout from "./layouts/StaffLayout";
import TherapistLayout from "./layouts/TherapistLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import Login from "./pages/Login/Login";
import MainLayout from "./pages/HomePage";
import HomePageForm from "./components/forms/HomePageForm/HomePageForm";
import Service from "./pages/Service/Service";
import Price from "./pages/Price/Price";


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />} >
         <Route path="/login" element={<Login />} />
         <Route index element={<HomePageForm />} />
         <Route path="/service" element={<Service />} />
         <Route path="/price" element={<Price />} />
      </Route>

       
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
