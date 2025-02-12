import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"

import Manager from "./layouts/manager"
import Staff from "./components/staff/page/Staff"
import CheckIn from "./components/staff/page/checkin/CheckIn"
import CheckOut from "./components/staff/page/checkout/CheckOut"
import Therapist from "./components/therapist/page/Therapist"
import RecordBooking from "./components/therapist/page/RecordBooking/RecordBooking"
import Schedule from "./components/therapist/page/schedule/Schedule"


function App() {
  return (  
   <BrowserRouter>
      <Routes>
      
        <Route path="/" element="" />
        <Route path="/login" element={<Login />} />
        <Route path="/manager/" element={<Manager />} >
        
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
        
        </Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
