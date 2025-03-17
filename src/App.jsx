import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Customer from "./pages/customer/Customer";
import CustomerLayout from "./layouts/customer/Customer";
import Manager from "./layouts/manager";
import Dashboard from "./pages/manager/dashboard/Dashboard";
import COMPONENT_PATH_HELPER from "./helpers/ComponentPathHelper";
import Staff from "./pages/staff/home/Staff";
import CheckIn from "./pages/staff/checkin/CheckIn";
import CheckOut from "./pages/staff/checkout/CheckOut";
import Therapist from "./pages/therapist/home/Therapist";
import RecordBooking from "./pages/therapist/RecordBooking/RecordBooking";
import Schedule from "./pages/therapist/schedule/Schedule";
import ChangeSchedule from "./pages/therapist/schedule/ChangeShedule";
import CustomerService from "./pages/customer/customerService/CustomerService";
import Content from "./components/customer/outletContent/Content";
import Register from "./pages/customer/register/Register";
import RegisterForm from "./components/common/form/register/RegisterForm";
import RegisterEmail from "./components/common/form/register/email/RegisterEmail";
import ConfirmEmail from "./components/common/form/register/email/confirm/ConfirmEmail";
import CustomerDetail from "./layouts/customer/customerDetail/CustomerDetail";
import Appointments from "./pages/customer/customerDetail/appointment/Appointments";
import Account from "./pages/customer/customerDetail/account/Account";
import AdminDashboard from "./pages/admin/home/AdminDashboard";
import ManageAccount from "./pages/admin/account/ManageAccount";
import CustomerViewTherapist from "./pages/customer/customerViewTherapist/CustomerViewTherapist";
import TherapistDetail from "./pages/customer/customerViewTherapist/TherapistDetail";

import TherapistProfile from "./pages/therapist/ManagerInformation/TherapistProfie";
import CustomerContact from "./pages/customer/customerContact/CustomerContact";
import Booking from "./pages/customer/customerBooking/Booking";
import CustomerBlog from "./pages/customer/customerBlog/CustomerBlog";
import BlogDetails from "./components/customer/blog/blogDetails/BlogDetails";
import ServiceDetails from "./components/customer/serviceDetails/ServiceDetails";
import CustomerPrice from "./pages/customer/customerPrice/CustomerPrice";
import CustomerQuiz from "./pages/customer/quiz/CustomerQuiz";
import CustomerPayment from "./pages/customer/customerPayment/CustomerPayment";
import PaymentReturn from "./components/customer/payment/payment-return/PaymentReturn";
import PaymentSuccess from "./components/customer/payment/payment-return/payment-return-success/PaymentSuccess";
import PaymentFailure from "./components/customer/payment/payment-return/payment-return-failure/PaymentFailure";
import Itinerary from "./pages/therapist/CreateRoute/Itinerary";
import Test from "./pages/staff/test";
import CheckOutTherapist from "./pages/staff/checkout/CheckOutTherapist";
import ManagerBlog from "./pages/staff/Blog/Blog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Customer />} />
          <Route path="customer-service" element={<CustomerService />}>
            <Route index element={<Content />} />
            <Route path="service-details" element={<ServiceDetails />} />
          </Route>
          <Route path="customer-detail/" element={<CustomerDetail />}>
            <Route index element={<Account />} />
            <Route path="account" element={<Account />} />
            <Route path="appointments" element={<Appointments />} />
          </Route>
          <Route
            path="customer-view/therapist"
            element={<CustomerViewTherapist />}
          />
          <Route
            path="/customer-view/therapist/:id"
            element={<TherapistDetail />}
          />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<CustomerContact />} />
          <Route path="blog" element={<CustomerBlog />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="/price" element={<CustomerPrice />} />
          <Route path="/quiz" element={<CustomerQuiz />} />
          <Route path="/payment" element={<CustomerPayment />} />
          <Route path="/payment-return" element={<PaymentReturn />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
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
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="manageAccount" element={<ManageAccount />} />
        </Route>
        <Route path="/staff" element={<Staff />}>
          <Route path="checkin" element={<CheckIn />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="checkoutTherapist" element={<CheckOutTherapist />} />
          {/* <Route path="datngu" element={<Test />} /> */}
          <Route path="managerBlog" element={<ManagerBlog />} />
        </Route>
        <Route path="/therapist" element={<Therapist />}>
          <Route path="schedule" element={<Schedule />} />
          <Route path="record" element={<RecordBooking />} />
          <Route path="changeSchedule" element={<ChangeSchedule />} />
          <Route path="managerInformation" element={<TherapistProfile />} />
          <Route path="itinerary" element={<Itinerary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
