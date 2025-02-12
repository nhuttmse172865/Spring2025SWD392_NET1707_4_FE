import React, { useState } from "react";
import ICONS from "../../../../../constants/icons";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";

const Modal = ({ setShowModal, itemUpdate, setItemUpdate }) => {
  const [active, setActive] = useState(true);
  const handleCloseModal = () => {
    setActive(false);
    setTimeout(() => {
      setItemUpdate();
      setShowModal(false);
    }, 250);
  };

  return (
    <div
      className="w-[18vw] max-h-[80vh] min-w-[500px] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll"
      style={{ animation: active ? "fade-in 0.3s" : "fade-out 0.3s" }}
    >
      <img
        onClick={() => handleCloseModal()}
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
      />
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        {itemUpdate ? "UPDATE CATEGORY" : "NEW CATEGORY"}
      </h3>
      <div className="mt-8">
        <div className="grid">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Category
          </label>
          <input
            type="text"
            placeholder="Facial Treatments"
            className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
          />
        </div>
        <div className="mb-10 mt-5">
          <ElevatedButton
            width="100%"
            height="50px"
            rounded=".375rem"
            text={itemUpdate ? "Update" : "Add"}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
