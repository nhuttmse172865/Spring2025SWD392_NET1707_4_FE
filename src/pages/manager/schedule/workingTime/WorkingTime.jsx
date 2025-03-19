import React, { useState } from "react";
import Content from "../../../../components/manager/schedule/workingTime/content/Content";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/schedule/workingTime/modal/Modal";

const WorkingTime = () => {
  const [showModal, setShowModal] = useState(false);
  const [reloadData,setReloadData] = useState(false);
  const [itemUpdate,setItemUpdate] = useState()
  
  return (
    <div>
      <Content setShowModal={setShowModal} reloadData={reloadData} setItemUpdate={setItemUpdate}/>
      {showModal && (
        <Popup>
          <Modal setShowModal={setShowModal} setReloadData={setReloadData} itemUpdate={itemUpdate} setItemUpdate={setItemUpdate} />
        </Popup>
      )}
    </div>
  );
};

export default WorkingTime;
