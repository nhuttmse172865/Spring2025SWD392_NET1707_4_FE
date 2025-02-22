import React, { useEffect, useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/services/issueSkin/content/Content";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/services/issueSkin/modal/Modal";
import axios from "axios";
import BASE from "../../../../constants/base";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";

export const IssueSkin = () => {
  const [showModal, setShowModal] = useState(false);
  const [issueSkins, setIssueSkin] = useState();
  const [refreshData, setRefreshData] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();
  const [loading, setLoading] = useState(false);
  const [issueSkinItemsActive, setIssueSkinItemActive] = useLocalStorage(
    LOCALSTORAGE_NAME.ISSUE_SKIN_ITEMS_ACTIVE,
    ""
  );

  const handleLoadIssueSkin = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/issue-skin`);
      if (!response || response.status !== 200) throw new Error();
      setIssueSkin(response.data.data);
    } catch (error) {
    } finally {
    }
  };

  const handleDeleteIssueSkins = async () => {
    setLoading(true);
    let ids = "";
    issueSkinItemsActive &&
      Array.isArray(issueSkinItemsActive) &&
      issueSkinItemsActive.forEach((item, index) => {
        if (index === issueSkinItemsActive.length - 1) {
          ids += `ids=${item.id}`;
        } else {
          ids += `ids=${item.id}&`;
        }
      });
    try {
      const response = await axios.delete(`${BASE.BASE_URL}/issue-skin?${ids}`);
      if (!response || response.status !== 200) throw new Error();
      setRefreshData(prev => !prev)
    } catch (error) {
      console.log(error);
    } finally {
      setIssueSkinItemActive()
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadIssueSkin();
  }, [refreshData]);
  return (
    <div className="mt-12">
      <ToolBar
        handleOnClickElevated={() => setShowModal(true)}
        handleOnClickOutline={handleDeleteIssueSkins}
        isLoadingOutline={loading}
        activeOutlineButton={issueSkinItemsActive && issueSkinItemsActive.length > 0}
      />
      <div>
        <Content
          issueSkins={issueSkins}
          setShowModal={setShowModal}
          setItemUpdate={setItemUpdate}
        />
      </div>
      {showModal && (
        <Popup>
          <Modal
            setShowModal={setShowModal}
            setRefreshData={setRefreshData}
            itemUpdate={itemUpdate}
            setItemUpdate={setItemUpdate}
          />
        </Popup>
      )}
    </div>
  );
};
