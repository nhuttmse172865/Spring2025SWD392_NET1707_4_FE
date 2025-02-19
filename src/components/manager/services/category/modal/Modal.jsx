import React, { useEffect, useState } from "react";
import ICONS from "../../../../../constants/icons";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Modal = ({ setShowModal, itemUpdate, setItemUpdate, setRefreshData }) => {
  const [active, setActive] = useState(true);
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseModal = () => {
    setActive(false);
    setTimeout(() => {
      setItemUpdate();
      setShowModal(false);
    }, 250);
  };

  const handleAddCategory = async () => {
    setIsLoading(true);
    const data = {
      name: category,
      description: description
    };
    try {
      const response = await axios.post(
        `${BASE.BASE_URL}/category/create`,
        data
      );
      if (!response || response.status !== 201) throw Error();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshData(prev => !prev)
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    setIsLoading(true);
    const data = {
      name: category,
      description: description
    };
    try {
      const response = await axios.put(
        `${BASE.BASE_URL}/category/update?id=${itemUpdate.id}`,
        data
      );
      if (!response || response.status !== 200) throw Error();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshData(prev => !prev)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(itemUpdate){
      setCategory(itemUpdate.name)
      setDescription(itemUpdate.description)
    }
  },[itemUpdate])

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
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
          />
        </div>
        <div className="grid mt-5 mb-7">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Description
          </label>
          <textarea
            name=""
            id=""
            rows="3"
            value={description}
            placeholder="......"
            className="border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            style={{
              padding: "12px",
              resize: "none",
            }}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="mb-10 mt-5">
          <ElevatedButton
            width="100%"
            height="50px"
            rounded=".375rem"
            text={itemUpdate ? "Update" : "Add"}
            isLoading={isLoading}
            handleOnclick={itemUpdate ? handleUpdateCategory : handleAddCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
