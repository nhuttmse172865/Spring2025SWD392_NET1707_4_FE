import React, { useState } from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/services/category/content/Content";
import Popup from "../../../../components/common/popup/Popup";
import Modal from "../../../../components/manager/services/category/modal/Modal";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../constants/localStorageName";
import axios from "axios";
import BASE from "../../../../constants/base";

const Category = () => {
  const [categoryActive, setCategoryActive] = useLocalStorage(
    LOCALSTORAGE_NAME.CATEGORY_ITEMS_ACTIVE,
    ""
  );
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemUpdate, setItemUpdate] = useState();
  const [refreshData, setRefreshData] = useState(false);

  const handleDeleteCategories = async () => {
    setLoading(true);
    let ids = "";
    Array.isArray(categoryActive) &&
      categoryActive.forEach((item, index) => {
        if (index === categoryActive.length - 1) {
          ids += `ids=${item}`;
        } else {
          ids += `ids=${item}&`;
        }
      });
    try {
      const response = await axios.delete(
        `${BASE.BASE_URL}/category/delete-items?${ids}`
      );
      if (!response || response.status !== 200) throw new Error();
      setRefreshData((prev) => !prev);
      setCategoryActive()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12">
      <ToolBar
        activeOutlineButton={
          Array.isArray(categoryActive) && categoryActive.length > 0
        }
        handleOnClickElevated={() => setShowModal(true)}
        handleOnClickOutline={handleDeleteCategories}
        isLoadingOutline={loading}
      />
      <div>
        <Content
          setItemUpdate={setItemUpdate}
          setShowModal={setShowModal}
          refreshData={refreshData}
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

export default Category;
