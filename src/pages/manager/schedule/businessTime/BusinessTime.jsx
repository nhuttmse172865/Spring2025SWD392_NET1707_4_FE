import React, { useState } from 'react'
import Content from '../../../../components/manager/schedule/businessTime/content/Content'
import Popup from '../../../../components/common/popup/Popup';
import Modal from '../../../../components/manager/schedule/businessTime/modal/Modal';

const BusinessTime = () => {
    const [showModal, setShowModal] = useState(false);
    const [dateSelected, setDateSelected] = useState()
    const [refreshData,setRefreshData] = useState(false)
  return (
    <div>
      <Content setShowModal={setShowModal} setDateSelected={setDateSelected} refreshData={refreshData} />
      {showModal && (
        <Popup>
          <Modal handleCloseModal={() => setShowModal(false)} dateSelected={dateSelected} setRefreshData={setRefreshData} />
        </Popup>
      )}
    </div>
  )
}

export default BusinessTime