import React, { useEffect, useState } from "react";
import OutlineButton from "../../../../common/button/outline/OutlineButton";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import Select from "../../../../common/select/Select";
import InputImage from "../modal/add/inputImage/InputImage";
import Table from "./table/Table";
import axios from "axios";
import BASE from "../../../../../constants/base";

const ModalUpdate = ({ itemUpdate, setShowModalUpdate }) => {
  const [id,setId] = useState()
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [gapDay, setGapDay] = useState();
  const [categories, setCategories] = useState();
  const [issueSkin, setIssueSkin] = useState();
  const [skinType, setSkinType] = useState();
  const [therapist, setTherapist] = useState();
  const [images,setImages] = useState();

  const [categoriesList, setCategoriesList] = useState();
  const [issueSkinList, setIssueSkinList] = useState();
  const [skinTypeList, setSkinTypeList] = useState();
  const [therapistList, setTherapistList] = useState();

  const handleLoadCategory = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/category/getAll`);
      if (!response || response.status !== 200) throw new Error();
      console.log(response.data);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleLoadIssueSkin = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/issue-skin`);
      if (!response || response.status !== 200) throw new Error();
      setIssueSkinList(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleLoadSkinType = async () => {
    try {
      const response = await axios.get(`${BASE.BASE_URL}/skinType/getAll`);
      if (!response || response.status !== 200) throw new Error();
      setSkinTypeList(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleLoadTherapist = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/get-all-therapists?page=0&size=10`
      );
      if (!response || response.status !== 200) throw new Error();
      setTherapistList(response.data.data.content);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (!categoriesList) {
      handleLoadCategory();
    }
    if (!issueSkinList) {
      handleLoadIssueSkin();
    }
    if (!skinTypeList) {
      handleLoadSkinType();
    }
    if (!therapistList) {
      handleLoadTherapist();
    }
  }, []);

  useEffect(() => {
    setImages(itemUpdate.image)
    setId(itemUpdate.id)
    setName(itemUpdate.name);
    setDescription(itemUpdate.description);
    setGapDay(itemUpdate.gapDay);
    setCategories(itemUpdate.categoryName);
    setIssueSkin(itemUpdate.issueTypeName);
    setSkinType(itemUpdate.skinTypeName);
    setTherapist(itemUpdate.therapistsName);
  }, []);

  return (
    <div className="w-[60vw] h-[90vh] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll">
      <div className="bg-yellow-20 flex justify-between items-center">
        <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
          UPDATE SERVICE
        </h3>
        <div className="flex gap-5">
          <OutlineButton
            text={"Close"}
            width={"100px"}
            rounded={".375rem"}
            height={"45px"}
            handleOnclick={() => setShowModalUpdate(false)}
          />
          <ElevatedButton
            width={"180px"}
            height={"45px"}
            rounded={".375rem"}
            text="Save"
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="flex gap-10">
          <div className="w-[50%]">
            <div className="flex gap-10">
              <div className="grid w-[250px] mt-5">
                <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Facial Treatment"
                  className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="grid w-[250px] mt-5">
                <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                  Category
                </label>
                {categories && categoriesList && (
                  <Select
                    list={categoriesList.map((item) => item.name)}
                    modeShowTextOnInput={false}
                    mutilpleSelect={false}
                    setListSelected={setCategories}
                    itemReadySelect={categories}
                    text="Select category"
                    width="200px"
                  />
                )}
              </div>
            </div>
            <div className="grid mt-5 mb-7">
              <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                Issue Skin
              </label>
              <div className="flex flex-wrap gap-2.5 p-1">
                {issueSkin &&
                  issueSkin.map((item, index) => (
                    <span
                      className="w-fit h-fit px-4 rounded-[.375rem] text-[14px] text-white bg-(--color-primary-80)"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
              </div>
              {issueSkin && (
                <Select
                  list={issueSkinList && issueSkinList.map((item) => item.name)}
                  modeShowTextOnInput={true}
                  mutilpleSelect={true}
                  setListSelected={setIssueSkin}
                  itemReadySelect={issueSkin}
                  text="Select issue skin"
                  width="250px"
                />
              )}
            </div>
            <div className="grid mt-5 mb-7">
              <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                Skin Type
              </label>
              <div className="flex gap-2.5 p-1 flex-wrap">
                {skinType &&
                  skinType.map((item, index) => (
                    <span
                      className="w-fit h-fit px-4 rounded-[.375rem] text-[14px] text-white bg-(--color-primary-80)"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
              </div>
              {skinType && (
                <Select
                  list={skinTypeList && skinTypeList.map((item) => item.name)}
                  modeShowTextOnInput={true}
                  mutilpleSelect={true}
                  setListSelected={setSkinType}
                  itemReadySelect={skinType}
                  text="Select skin type"
                  width="200px"
                />
              )}
            </div>
            <div className="flex gap-10 items-end">
              <div className="flex flex-col">
                <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                  Therapist
                </label>
                <div className="flex gap-2.5 p-1 flex-wrap">
                  {therapist &&
                    therapist.map((item, index) => (
                      <span
                        className="w-fit h-fit px-4 rounded-[.375rem] text-[14px] text-white bg-(--color-primary-80)"
                        key={index}
                      >
                        {item}
                      </span>
                    ))}
                </div>
                {therapist && (
                  <Select
                    list={
                      therapistList &&
                      therapistList.map((item, index) => item.account.name)
                    }
                    modeShowTextOnInput={true}
                    mutilpleSelect={true}
                    setListSelected={setTherapist}
                    itemReadySelect={therapist}
                    text="Select therapist"
                    width="300px"
                  />
                )}
              </div>
              <div className="flex flex-col w-[200px] align-bottom">
                <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                  Gap Day
                  <span className="text-[13px] text-[rgba(0,0,0,0.5)]">
                    (days)
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="Facial Treatment"
                  value={gapDay}
                  onChange={(event) => setGapDay(event.target.value)}
                  className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
                />
              </div>
            </div>
            <div className="grid mt-5">
              <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                Description
              </label>
              <textarea
                name=""
                id=""
                rows="3"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="A luxurious facial treatment designed to rejuvenate and revitalize your skin."
                className="border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
                style={{
                  padding: "12px",
                  resize: "none",
                }}
              ></textarea>
            </div>
          </div>
          <div className="w-[50%]">
            {images &&
                images.map((item, index) => (
                  <InputImage
                    key={index}
                    width="100px"
                    height="100px"
                    imageObject={item}
                    index={index}
            
                  />
                ))}
            <InputImage width="100px" height="100px" />
          </div>
        </div>

        <div className="mt-7 ">
          <label className="text-[16px] mb-0.5 text-[rgba(0,0,0,0.7)] font-medium">
            Service Detail
          </label>
          <Table serviceId={id}/>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
