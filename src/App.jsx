import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Customer from "./pages/customer/Customer"


function App() {
  return (  
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager/" element="" >

        </Route>
        <Route path="/admin/" element="">

        </Route>
        <Route path="/staff/" element="">

        </Route>
        <Route path="/therapist/" element="">

        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
