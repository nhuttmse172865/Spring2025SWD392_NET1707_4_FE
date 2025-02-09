import React from 'react'
import Header from '../../components/customer/header/Header'
import Content from '../../components/customer/bodyContent/Content'
const Customer = () => {
  return (
    <div className="header-container">
      <Header />
      <div className="content-container">
        <Content />
      </div>
    </div>

  )
}

export default Customer