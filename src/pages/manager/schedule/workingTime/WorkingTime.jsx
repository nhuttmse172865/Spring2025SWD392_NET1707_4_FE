import React, { useState } from "react";
import Content from "../../../../components/manager/schedule/workingTime/content/Content";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/schedule/workingTime/modal/Modal";

const WorkingTime = () => {
  const [showModal, setShowModal] = useState(false);
  const [reloadData,setReloadData] = useState(false);
  return (
    <div>
      <Content setShowModal={setShowModal} reloadData={reloadData} />
      {showModal && (
        <Popup>
          <Modal setShowModal={setShowModal} setReloadData={setReloadData} />
        </Popup>
      )}
    </div>
  );
};

export default WorkingTime;
