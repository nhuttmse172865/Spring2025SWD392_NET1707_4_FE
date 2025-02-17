import React, { useEffect, useState } from "react";
import ICONS from "../../../../../constants/icons";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import AGE from "../../../../../constants/age";
import Select from "../../../../common/select/Select";
import axios from "axios";
import BASE from "../../../../../constants/base";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../constants/localStorageName";

const Modal = ({ setShowModal, setRefreshData, itemUpdate, setItemUpdate }) => {
  const [active, setActive] = useState(true);
  const [ages, setAges] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [commonCause, setCommonCause] = useState();
  const [loading, setLoading] = useState(false);
  const [itemAges, setItemAges] = useLocalStorage(
    LOCALSTORAGE_NAME.AGE_INFORMATION_CACHE,
    ""
  );
  const handleCloseModal = () => {
    setActive(false);
    setTimeout(() => {
      setShowModal(false);
      setItemUpdate();
    }, 250);
  };
  const [age, setAge] = useState();
  const handleLoadAges = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/age`);
      if (!response || response.status !== 200) throw new Error();
      let listAges = Array.isArray(response.data.data)
        ? response.data.data.map((item) => item.name)
        : null;
      setItemAges(response.data.data);
      setAges(listAges);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const handleAddIssueSkin = async () => {
    setLoading(true);
    const listAges = Array.isArray(itemAges)
      ? itemAges.filter((item) => age === item.name || age.includes(item.name))
      : null;
    const data = {
      name: name,
      ages: listAges,
      cause: commonCause,
      description: description,
    };
    try {
      console.log(data);
      const response = await axios.post(`${BASE.BASE_URL}/issue-skin`, data);
      if (!response || response.status !== 201) throw new Error();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshData((prev) => !prev);
      setLoading(false);
    }
  };

  const handleUpdateIssueSkin = async () => {
    setLoading(true);
    const listAges = Array.isArray(itemAges)
      ? itemAges.filter((item) => age === item.name || age.includes(item.name))
      : null;
    const data = {
      id: itemUpdate.id,
      name: name,
      ages: listAges,
      cause: commonCause,
      description: description,
    };
    try {
      const response = await axios.put(`${BASE.BASE_URL}/issue-skin`, data);
      if (!response || response.status !== 200) throw new Error();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setItemUpdate();
      setRefreshData((prev) => !prev);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ages) {
      handleLoadAges();
    }
  }, [ages]);

  useEffect(() => {
    if (itemUpdate) {
      setName(itemUpdate.name);
      setDescription(itemUpdate.description);
      setCommonCause(itemUpdate.cause);
      const agesList =
        itemUpdate.ages &&
        Array.isArray(itemUpdate.ages) &&
        itemUpdate.ages.map((age) => age.name);
      setAge(agesList);
    }
  }, [itemUpdate]);

  return (
    <div
      className="w-[30vw] h-[85vh] bg-white rounded-[.375rem] relative p-5 overflow-y-scroll"
      style={{ animation: active ? "fade-in 0.3s" : "fade-out 0.3s" }}
    >
      <img
        onClick={() => handleCloseModal()}
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
      />
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        {itemUpdate ? "UPDATE ISSUE SKIN" : "NEW ISSUE SKIN"}
      </h3>
      <div className="mt-10">
        <div className="grid max-w-[200px]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Name
          </label>
          <input
            type="text"
            placeholder="Oily skin"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
          />
        </div>
        <div className="grid mt-5">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Age
          </label>
          <div className="h-[50px] w-full flex flex-wrap mb-2 gap-1">
            {age && Array.isArray(age) ? (
              age.map((item, index) => (
                <span
                  className="w-fit h-fit px-4 rounded-[.375rem] text-[14px]"
                  key={index}
                  style={{
                    backgroundColor: itemAges.filter(
                      (itemAge) => itemAge.name === item
                    )[0]?.backgroundColor,
                    color: itemAges.filter(
                      (itemAge) => itemAge.name === item
                    )[0]?.textColor,
                  }}
                >
                  {item}
                </span>
              ))
            ) : (
              <span
                className="w-fit h-fit px-4 rounded-[.375rem] text-[14px] "
                style={{
                  backgroundColor: itemAges.filter(
                    (itemAge) => itemAge.name === age
                  )[0]?.backgroundColor,
                  color: itemAges.filter((itemAge) => itemAge.name === age)[0]
                    ?.textColor,
                }}
              >
                {age}
              </span>
            )}
          </div>
          <Select
            list={ages}
            modeShowTextOnInput={true}
            mutilpleSelect={true}
            height="40px"
            width="160px"
            setListSelected={setAge}
          />
        </div>
        <div className="grid max-w-[300px] mt-5">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Common Cause
          </label>
          <textarea
            name=""
            id=""
            rows="2"
            placeholder="Hormones, bacteria, oil, clogged pores"
            className="border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            value={commonCause}
            style={{
              padding: "12px",
              resize: "none",
            }}
            onChange={(event) => setCommonCause(event.target.value)}
          ></textarea>
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
            placeholder="Pimples, blackheads, whiteheads, cysts, papules, pustules"
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
            isLoading={loading}
            handleOnclick={
              itemUpdate ? handleUpdateIssueSkin : handleAddIssueSkin
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
