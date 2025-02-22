import React, { useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/account/therapist/content/Content";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/account/therapist/modal/Modal";

const Therapist = () => {
  const [showModal, setShowModal] = useState();
  const [itemUpdate,setItemUpdate] = useState()

  return (
    <div className="mt-10">
      <ToolBar handleOnClickElevated={() => setShowModal(true)} />
      <div>
        <Content setShowModal={setShowModal}  setItemUpdate={setItemUpdate}/>
      </div>
      {showModal && (
        <Popup>
          <Modal
            handleCloseModal={() => setShowModal(false)}
            itemUpdate={itemUpdate}
          />
        </Popup>
      )}
    </div>
  );
};

export default Therapist;
