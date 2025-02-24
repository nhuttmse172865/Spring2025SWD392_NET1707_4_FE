import React from 'react'
import NavigationAdmin from '../../../components/admin/navigation/NavigationAdmin';
import HeaderAdmin from '../../../components/admin/header/HeaderAdmin';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen flex bg-gray-100 ">
          <div className="min-w-[250px] max-w-[300px] ">
            <NavigationAdmin />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden  ml-5  " >
          <HeaderAdmin/>
            <div className="flex-1 overflow-y-auto pe-4">
              <Outlet />
            </div>
          </div>
        </div>
      );
}

export default AdminDashboard
