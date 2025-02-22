import React, { useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/account/staff/content/Content";
import Modal from "../../../../components/manager/account/staff/modal/Modal";
import Popup from "../../../../components/common/popup/Popup";

const Staff = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mt-10">
      <ToolBar handleOnClickElevated={() => setShowModal(true)} />
      <div>
        <Content />
      </div>
      {showModal && (
        <Popup>
          <Modal handleCloseModal={() => setShowModal(false)}/>
        </Popup>
      )}
    </div>
  );
};

export default Staff;
