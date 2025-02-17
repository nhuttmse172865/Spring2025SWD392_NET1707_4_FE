import React, { useEffect, useState } from "react";
import ICONS from "../../../../../constants/icons";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import axios from "axios";
import BASE from "../../../../../constants/base";

const Modal = ({ setShowModal, itemUpdate, setItemUpdate,  setRefreshData }) => {
  const [active, setActive] = useState(true);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const handleCloseModal = () => {
    setActive(false);
    setTimeout(() => {
      setItemUpdate();
      setShowModal(false);
    }, 250);
  };

  const handleOnclickAdd = async () => {
    setLoading(true)
    const data = {
      name: name,
      description: description,
    };
    try {
      const response = await axios.post(`${BASE.BASE_URL}/skinType/create`,data);
      if(!response || response.status !== 201) throw new Error()
      setShowModal(false)
      setRefreshData(prev => !prev)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  const handleOnclickUpdate = async () => {
    setLoading(true)
    const data = {
      name: name,
      description: description,
    };
    try {
      const response = await axios.put(`${BASE.BASE_URL}/skinType/update?id=${itemUpdate.id}`,data);
      if(!response || response.status !== 200) throw new Error()
      setShowModal(false)
      setRefreshData(prev => !prev)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(itemUpdate){
      setName(itemUpdate.name)
      setDescription(itemUpdate.description)
    }
  }, [itemUpdate])

  return (
    <div
      className="w-[30vw] max-h-[80vh] min-w-[500px] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll"
      style={{ animation: active ? "fade-in 0.3s" : "fade-out 0.3s" }}
    >
      <img
        onClick={() => handleCloseModal()}
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
      />
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        {itemUpdate ? "UPDATE SKIN TYPE" : "NEW SKIN TYPE"}
      </h3>
      <div className="mt-10">
        <div className="grid">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Name
          </label>
          <input
            type="text"
            placeholder="Oily skin"
            value={name}
            className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="grid mt-5 mb-7">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Description
          </label>
          <textarea
            name=""
            id=""
            rows="5"
            value={description}
            placeholder="This type produces excess oil, leading to a shiny appearance, enlarged pores, and a tendency to develop acne"
            className="border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            style={{
              padding: "12px",
              resize: "none",
            }}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <div className="mb-10">
          <ElevatedButton
            width="100%"
            height="50px"
            rounded=".375rem"
            text={itemUpdate ? "Update" : "Add"}
            handleOnclick={itemUpdate ? handleOnclickUpdate : handleOnclickAdd}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
