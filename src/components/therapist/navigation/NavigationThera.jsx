import React from 'react'
import MenuThera from '../menu/MenuThera'
import IMAGES from '../../../constants/images'

const NavigationThera = () => {
  return (
    <div>
      <div className="h-[100vh] py-5 px-5 bg-white manager-navigation relative">
      <div className="manager-navigation-logo">
        <img src={IMAGES.logo} alt="Logo" />
      </div>
      <div className="mt-8 pb-5 h-full relative">
        <MenuThera />
      </div>
    </div>
    </div>
  )
}

export default NavigationThera
