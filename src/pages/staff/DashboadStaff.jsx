import React from 'react'



const DashboadStaff = () => {
  return (
    <div>
     
          <div className="flex">
            <div className="w-3/4 p-4">
              <h1 className="text-2xl font-bold mb-4">Booking Information</h1>
              {/* Add booking information here */}
            </div>
            <div className="w-1/4 p-4 bg-gray-100">
              <nav>
                <ul>
                  <li className="mb-2"><a href="#" className="text-blue-500">Home</a></li>
                  <li className="mb-2"><a href="#" className="text-blue-500">Bookings</a></li>
                  <li className="mb-2"><a href="#" className="text-blue-500">Profile</a></li>
                  <li className="mb-2"><a href="#" className="text-blue-500">Settings</a></li>
                </ul>
              </nav>
            </div>
          </div>
      

      
    </div>
  )
}

export default DashboadStaff
