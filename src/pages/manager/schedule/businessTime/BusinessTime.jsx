import React, { useState } from 'react'
import Content from '../../../../components/manager/schedule/businessTime/content/Content'
import Popup from '../../../../components/common/popup/Popup';
import Modal from '../../../../components/manager/schedule/businessTime/modal/Modal';

const BusinessTime = () => {
    const [showModal, setShowModal] = useState(false);
    const [dateSelected, setDateSelected] = useState()
  return (
    <div>
      <Content setShowModal={setShowModal} setDateSelected={setDateSelected} />
      {showModal && (
        <Popup>
          <Modal handleCloseModal={() => setShowModal(false)} dateSelected={dateSelected} />
        </Popup>
      )}
    </div>
  )
}

export default BusinessTime