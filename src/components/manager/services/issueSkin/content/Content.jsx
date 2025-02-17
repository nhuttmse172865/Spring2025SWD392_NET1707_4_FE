import React from 'react'
import Header from '../table/header/Header'
import Body from '../table/body/Body'

const Content = ({issueSkins, setShowModal, setItemUpdate}) => {
  return (
    <div className='pt-5'>
      <Header />
      <Body issueSkins={issueSkins} setShowModal={setShowModal} setItemUpdate={setItemUpdate} />
    </div>
  )
}

export default Content