import React from 'react'
import Header from '../../components/customer/header/Header'
import Content from '../../components/customer/bodyContent/Content'
import Footer from '../../components/customer/footer/Footer'
const Customer = () => {
  return (
    <div className="header-container">
      <Header />
      <div className="content-container">
        <Content />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>

  )
}

export default Customer