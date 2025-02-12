import React, { useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/services/skinType/content/Content";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/services/skinType/modal/Modal";

const SkinType = () => {
  const [skinTypeItemsActive, setSkinTypeItemsActive] = useLocalStorage(
    LOCALSTORAGE_NAME.SKIN_TYPE_ITEMS_ACTIVE,
    ""
  );
  const [showModal, setShowModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();

  return (
    <div className="mt-12">
      <ToolBar
        activeOutlineButton={
          Array.isArray(skinTypeItemsActive) && skinTypeItemsActive.length > 0
        }
        setShowModal={setShowModal}
      />
      <div>
        <Content setItemUpdate={setItemUpdate} setShowModal={setShowModal} />
      </div>
      {showModal && (
        <Popup>
          <Modal
            setShowModal={setShowModal}
            showModal={showModal}
            itemUpdate={itemUpdate}
            setItemUpdate={setItemUpdate}
          />
        </Popup>
      )}
    </div>
  );
};

export default SkinType;
