import React from 'react'
import './ElevatedButton.css'

const ElevatedButton = ({text, handleOnclick}) => {
  return (
    <div className='bg-(--color-primary-90) px-12 py-2 rounded-full cursor-pointer'>
        <span className='text-white text-elevated-button'>{text}</span>
    </div>
  )
}

export default ElevatedButton