import React from 'react'
import NavigationThera from '../../../components/therapist/navigation/NavigationThera'
import Header from '../../../components/manager/header/Header'
import { Outlet } from 'react-router-dom'
import HeaderTherapist from '../../../components/therapist/header/HeaderTherapist'

const Therapist = () => {
  return (
    <div>
    <div className="min-h-screen flex bg-gray-100">
      <div className=" min-w-[250px] max-w-[300px] bg-white ">
        <NavigationThera />
      </div>
      <div className='flex-1 flex flex-col overflow-hidden bg-white'>
      <HeaderTherapist />
      <div className="flex-1 overflow-y-auto p-4 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
     
    </div>
  )
}

export default Therapist
