import React, { useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/services/category/content/Content";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/services/category/modal/Modal";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";

const Category = () => {
  const [categoryActive, setCategoryActive] = useLocalStorage(
    LOCALSTORAGE_NAME.CATEGORY_ITEMS_ACTIVE,
    ""
  );
  const [showModal, setShowModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();
  return (
    <div className="mt-12">
      <ToolBar
        activeOutlineButton={
          Array.isArray(categoryActive) && categoryActive.length > 0
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

export default Category;
