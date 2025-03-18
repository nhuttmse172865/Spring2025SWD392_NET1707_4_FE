import React from 'react'
import Card from '../card/Card'
import DASHBOARD from '../../../../constants/dashboard'

const Analysis = () => {
  return (
    <div className=' h-[120px] grid grid-cols-5 gap-x-[20px]'>
        {DASHBOARD.ANALYSIS_ITEM.map((item) => (
            <Card item={item} />
        ))}
    </div>
  )
}

export default Analysis