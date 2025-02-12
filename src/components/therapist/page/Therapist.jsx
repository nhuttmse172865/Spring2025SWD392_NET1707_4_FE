import React from 'react'
import NavigationThera from '../navigation/NavigationThera'
import Header from '../../manager/header/Header'
import { Outlet } from 'react-router-dom'

const Therapist = () => {
  return (
    <div>
    <div className="min-h-screen flex bg-gray-100">
      <div className=" min-w-[250px] max-w-[300px] bg-white ">
        <NavigationThera />
      </div>
      <div className='flex-1 flex flex-col overflow-hidden bg-white'>
      <Header />
      <div className="flex-1 overflow-y-auto p-4 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
     
    </div>
  )
}

export default Therapist
