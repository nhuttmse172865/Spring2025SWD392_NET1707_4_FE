import React, { useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/services/skinType/content/Content";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/services/skinType/modal/Modal";
import axios from "axios";
import BASE from "../../../../constants/base";

const SkinType = () => {
  const [skinTypeItemsActive, setSkinTypeItemsActive] = useLocalStorage(
    LOCALSTORAGE_NAME.SKIN_TYPE_ITEMS_ACTIVE,
    ""
  );
  const [showModal, setShowModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();
  const [refreshData, setRefreshData] = useState(false);
  const [loading,setLoading] = useState(false)

  const handleDeleteItems = async () => {
    setLoading(true)
    let ids = "";
    Array.isArray(skinTypeItemsActive) &&
    skinTypeItemsActive.forEach((item, index) => {
        if (index === skinTypeItemsActive.length - 1) {
          ids += `ids=${item}`;
        } else {
          ids += `ids=${item}&`;
        }
      });
    try {
      const response = await axios.delete(`${BASE.BASE_URL}/skinType?${ids}`);
      if (!response || response.status !== 200) throw new Error();
      setRefreshData((prev) => !prev);
      setSkinTypeItemsActive([])
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="mt-12">
      <ToolBar
        activeOutlineButton={
          Array.isArray(skinTypeItemsActive) && skinTypeItemsActive.length > 0
        }
        handleOnClickOutline={handleDeleteItems}
        handleOnClickElevated={() => setShowModal(true)}
        isLoadingOutline={loading}
      />
      <div>
        <Content
          setItemUpdate={setItemUpdate}
          setShowModal={setShowModal}
          refreshData={refreshData}
          setRefreshData={setRefreshData}
        />
      </div>
      {showModal && (
        <Popup>
          <Modal
            setShowModal={setShowModal}
            showModal={showModal}
            itemUpdate={itemUpdate}
            setItemUpdate={setItemUpdate}
            setRefreshData={setRefreshData}
          />
        </Popup>
      )}
    </div>
  );
};

export default SkinType;
