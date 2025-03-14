import React from 'react'
import Table from '../table/Table'

const Content = ({setShowModal, setItemUpdate, setShowModalUpdate,refreshData}) => {
  return (
    <div>
        <Table setShowModal={setShowModal} refreshData={refreshData} setItemUpdate={setItemUpdate} setShowModalUpdate={setShowModalUpdate}/>
    </div>
  )
}

export default Content