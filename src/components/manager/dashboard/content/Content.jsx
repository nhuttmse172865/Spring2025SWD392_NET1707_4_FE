import React from 'react'
import Analysis from '../analysis/Analysis'
import Chart from '../chart/Chart'
import PopularService from '../popularService/PopularService'
import Transactions from '../transactions/Transactions'
import AppointmentRate from '../appointmentRate/AppointmentRate'

const Content = () => {
  return (
    <div className='overflow-y-scroll scroll-hidden'
        style={{
            height: "calc(100vh - 100px)",
        }}
    >
        <Analysis />
        <div className='grid grid-cols-11 mt-5 h-[400px] gap-x-[20px] overflow-hidden'>
            <Chart />
            <PopularService />
        </div>
        <div className=' grid grid-cols-12 mt-5 gap-x-5 h-[400px]'>
            <Transactions />
        <AppointmentRate />
        </div>
    </div>
  )
}

export default Content