import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Customer from "./pages/customer/Customer";

import Manager from "./layouts/manager";
import Dashboard from "./pages/manager/dashboard/Dashboard";
import COMPONENT_PATH_HELPER from "./helpers/ComponentPathHelper";
import Staff from "./pages/staff/home/Staff"
import CheckIn from "./pages/staff/checkin/CheckIn"
import CheckOut from "./pages/staff/checkout/CheckOut"
import Therapist from "./pages/therapist/home/Therapist"
import RecordBooking from "./pages/therapist/RecordBooking/RecordBooking"
import Schedule from "./pages/therapist/schedule/Schedule"
import ChangeSchedule from "./pages/therapist/schedule/ChangeShedule";
import CustomerService from "./pages/customer/customerService/CustomerService"
import Content from "./components/customer/outletContent/Content"


function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Customer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager/" element={<Manager />}>
            <Route index element={<Dashboard />} />
            {COMPONENT_PATH_HELPER.listRouteNavigationManager.map((item, index) => (
                <Route key={index} path={item.path} element={item.component} />
            ))}
        </Route>
        <Route path="/admin/" element="">
        </Route>
        <Route path="/staff" element={<Staff />}>
          <Route path="checkin" element={<CheckIn />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
        <Route path="/therapist" element={<Therapist />}>
          <Route path="schedule" element={<Schedule />} />
          <Route path="record" element={<RecordBooking />} />
        <Route path="changeSchedule" element={<ChangeSchedule />} />
        </Route>
        <Route path="/customer-service" element={<CustomerService />}>
          <Route index element={<Content />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
