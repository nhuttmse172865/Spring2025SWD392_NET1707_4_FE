import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Customer from "./pages/customer/Customer"
import Manager from "./layouts/manager"

function App() {
  return (  
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager/" element={<Manager />} >
        
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
