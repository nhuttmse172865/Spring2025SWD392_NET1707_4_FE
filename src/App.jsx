import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Customer from "./pages/customer/Customer";
import CustomerLayout from './layouts/customer/Customer'
import Manager from "./layouts/manager";
import Dashboard from "./pages/manager/dashboard/Dashboard";
import COMPONENT_PATH_HELPER from "./helpers/ComponentPathHelper";
import Staff from "./components/staff/page/Staff";
import CheckIn from "./components/staff/page/checkin/CheckIn";
import CheckOut from "./components/staff/page/checkout/CheckOut";
import Therapist from "./components/therapist/page/Therapist";
import RecordBooking from "./components/therapist/page/RecordBooking/RecordBooking";
import Schedule from "./components/therapist/page/schedule/Schedule";
import CustomerService from "./pages/customer/customerService/CustomerService";
import Content from "./components/customer/outletContent/Content";
import Register from "./pages/customer/register/Register";
import RegisterForm from "./components/common/form/register/RegisterForm";
import RegisterEmail from "./components/common/form/register/email/RegisterEmail";
import ConfirmEmail from "./components/common/form/register/email/confirm/ConfirmEmail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Customer />} />
          <Route path="customer-service" element={<CustomerService />}>
            <Route index element={<Content />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registrations/" element={<Register />}>
          <Route index element={<RegisterForm />} />
          <Route path="email/" element={<RegisterEmail />} />
          <Route path="confirm-email" element={<ConfirmEmail />} />
        </Route>
        <Route path="/manager/" element={<Manager />}>
          <Route index element={<Dashboard />} />
          {COMPONENT_PATH_HELPER.listRouteNavigationManager.map(
            (item, index) => (
              <Route key={index} path={item.path} element={item.component} />
            )
          )}
        </Route>
        <Route path="/admin/" element=""></Route>
        <Route path="/staff" element={<Staff />}>
          <Route path="checkin" element={<CheckIn />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
        <Route path="/therapist" element={<Therapist />}>
          <Route path="schedule" element={<Schedule />} />
          <Route path="record" element={<RecordBooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
