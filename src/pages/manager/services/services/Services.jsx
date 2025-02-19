import React, { useState } from 'react'
import ToolBar from '../../../../components/common/toolBar/ToolBar'
import Content from '../../../../components/manager/services/services/content/Content'
import Modal from '../../../../components/manager/services/services/modal/add/ModalAdd'
import Popup from '../../../../components/common/popup/Popup'

const Services = () => {
  const [showModal, setShowModal] = useState()

  return (
    <div className='mt-10'>
      <ToolBar />
      <div>
          <Content />
      </div>
      <Popup>
        <Modal />
      </Popup>
    </div>
  )
}

export default Services