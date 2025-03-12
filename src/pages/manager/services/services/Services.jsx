import React, { useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/services/services/content/Content";
import Modal from "../../../../components/manager/services/services/modal/add/ModalAdd";
import Popup from "../../../../components/common/popup/Popup";
import ModalUpdate from "../../../../components/manager/services/services/modalUpdate/ModalUpdate";

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState()
  const [showModalUpdate,setShowModalUpdate] = useState(false);

  return (
    <div className="mt-10">
      <ToolBar   handleOnClickElevated={() => setShowModal(true)}/>
      <div>
        <Content setShowModal={setShowModal} setItemUpdate={setItemUpdate} />
      </div>
      {showModal && (
        <Popup>
          <Modal setShowModal={setShowModal} />
        </Popup>
      )}
      {
        showModalUpdate && (
          <Popup>
            <ModalUpdate />
          </Popup>
        )
      }
    </div>
  );
};

export default Services;
