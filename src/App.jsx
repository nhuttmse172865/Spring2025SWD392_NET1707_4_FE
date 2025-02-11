import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Customer from "./pages/customer/Customer";
import Manager from "./layouts/manager";
import Dashboard from "./pages/manager/dashboard/Dashboard";
import COMPONENT_PATH_HELPER from "./helpers/ComponentPathHelper";

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
        <Route path="/admin/" element=""></Route>
        <Route path="/staff/" element=""></Route>
        <Route path="/therapist/" element=""></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
