import React from 'react'
import Table from '../table/Table'

const Content = ({setShowModal, setItemUpdate, setShowModalUpdate}) => {
  return (
    <div>
        <Table setShowModal={setShowModal} setItemUpdate={setItemUpdate} setShowModalUpdate={setShowModalUpdate}/>
    </div>
  )
}

export default Content