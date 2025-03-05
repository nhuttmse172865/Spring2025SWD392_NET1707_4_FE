import React, { useEffect, useState } from "react";
import ElevatedButton from "../../../../../common/button/elevated/ElevatedButton";
import OutlineButton from "../../../../../common/button/outline/OutlineButton";
import InputImage from "./inputImage/InputImage";
import Select from "../../../../../common/select/Select";
import ServiceDetailCard from "./card/serviceDetail/ServiceDetailCard";
import axios from "axios";
import Popup from "../../../../../common/popup/Popup";
import ServiceDetailModal from "./card/serviceDetail/modal/ServiceDetailModal";
import BASE from "../../../../../../constants/base";

const Modal = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [refreshImage, setRefreshImage] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [gapDay, setGapDay] = useState();
  const [categories, setCategories] = useState();
  const [issueSkin, setIssueSkin] = useState();
  const [skinType, setSkinType] = useState();
  const [therapist, setTherapist] = useState();

  const [categoriesList, setCategoriesList] = useState();
  const [issueSkinList, setIssueSkinList] = useState();
  const [skinTypeList, setSkinTypeList] = useState();
  const [therapistList, setTherapistList] = useState();

  const [serviceDetails, setServiceDetails] = useState([]);
  const [showModalServiceDetail, setShowModalServiceDetail] = useState(false);
  const [left, setLeft] = useState();
  const [serviceDetailUpdate, setServiceDetailUpdate] = useState();
  const [serviceDetailUpdateIndex, setServiceDetailUpdateIndex] = useState();

  const handleAddImage = (event, index) => {
    const image = event.target.files[0];
    if (index) {
      let imagesUpdate = images;
      imagesUpdate[index] = image;
      setImages(imagesUpdate);
    } else {
      let imagesAdd = images;
      imagesAdd.push(image);
      setImages(imagesAdd);
    }
    event.target.value = null;
    setRefreshImage((prev) => !prev);
  };

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

  const handleOnclick = (event, serviceDetail, index) => {
    const rect = event.target.getBoundingClientRect();
    console.log("Bounding Client Rect:", rect);
    setLeft(rect.left);
    setShowModalServiceDetail(true);
    if (serviceDetail) {
      setServiceDetailUpdate(serviceDetail);
      setServiceDetailUpdateIndex(index);
    }
  };

  const handleSaveImage = async (data) => {
    const formData = new FormData();
    Array.isArray(data) &&
      data.forEach((item) => {
        formData.append("images", item);
      });
    try {
      const response = await axios.post(
        `${BASE.BASE_URL}/upload-files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (!response || response.status !== 200) throw new Error();
      return response.data.data.successFiles;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleFetchData = async () => {
    let servicesDetailData = [];
    try {
      serviceDetails.map(async (item, index) => {
        const images = await handleSaveImage(item.imagesId);
        const imagesIds =
          Array.isArray(images) && images.map((image) => image.id);
        const serviceDetail = {
          name: item.name,
          description: item.description,
          price: item.price,
          duration: item.duration,
          steps: item.steps,
          imagesId: imagesIds,
        };
        servicesDetailData.push(serviceDetail);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }

    let imagesService = await handleSaveImage(images);
    const data = {
      service: {
        name: name,
        gapDay: gapDay,
        description: description,
        categoryId: categories,
        imagesId:
          Array.isArray(imagesService) &&
          imagesService.map((image) => image.id),
      },
      serviceDetails: servicesDetailData,
      therapistsIds: therapistList
        .filter((item) => therapist.includes(item.account.name))
        .map((item) => item.id),
      issueSkinIds: issueSkinList
        .filter((item) => issueSkin.includes(item.name))
        .map((item) => item.id),
      skinTypeIds: skinTypeList
        .filter((item) => skinType.includes(item.name))
        .map((item) => item.id),
    };
    return data;
  };

  const handleAddService = async () => {
    setLoading(true);
    const data = await handleFetchData();
    try {
      const response = await axios.post(
        `${BASE.BASE_URL}/service/create`,
        data
      );
      if (!response || response.data.status !== 201) throw new Error();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
  });

  return (
    <div className="w-[60vw] h-[90vh] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll">
      <div className="bg-yellow-20 flex justify-between items-center">
        <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
          NEW SERVICE
        </h3>
        <div className="flex gap-5">
          <OutlineButton
            text={"Close"}
            width={"100px"}
            rounded={".375rem"}
            height={"45px"}
            handleOnclick={() => setShowModal(false)}
          />
          <ElevatedButton
            width={"180px"}
            height={"45px"}
            rounded={".375rem"}
            text="Create Servcie"
            isLoading={loading}
            handleOnclick={() => handleAddService()}
          />
        </div>
      </div>

      <div
        className=" mt-5 px-10 pb-20 overflow-x-hidden"
        style={{
          height: "calc(90vh - 110px)",
        }}
      >
        <div className="mb-5 max-w-[40vw]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Image
          </label>
          <div className="flex flex-wrap gap-5 mt-3">
            {images &&
              images.map((item, index) => (
                <InputImage
                  key={index}
                  width="100px"
                  height="100px"
                  imageObject={item}
                  index={index}
                  handleChangeImage={handleAddImage}
                  refreshImage={refreshImage}
                />
              ))}
            <InputImage
              width="100px"
              height="100px"
              handleChangeImage={handleAddImage}
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="grid w-[300px] mt-5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Name
            </label>
            <input
              type="text"
              placeholder="Facial Treatment"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            />
          </div>
          <div className="grid w-[300px] mt-5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Category
            </label>
            <Select
              list={categoriesList && categoriesList.map((item) => item.name)}
              modeShowTextOnInput={false}
              mutilpleSelect={false}
              setListSelected={setCategories}
              text="Select category"
              width="200px"
            />
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
          <Select
            list={issueSkinList && issueSkinList.map((item) => item.name)}
            modeShowTextOnInput={true}
            mutilpleSelect={true}
            setListSelected={setIssueSkin}
            text="Select issue skin"
            width="250px"
          />
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
          <Select
            list={skinTypeList && skinTypeList.map((item) => item.name)}
            modeShowTextOnInput={true}
            mutilpleSelect={true}
            setListSelected={setSkinType}
            text="Select skin type"
            width="200px"
          />
        </div>
        <div className="flex gap-x-5 items-end">
          <div className="flex flex-col mt-5">
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
            <Select
              list={
                therapistList &&
                therapistList.map((item, index) => item.account.name)
              }
              modeShowTextOnInput={true}
              mutilpleSelect={true}
              setListSelected={setTherapist}
              text="Select therapist"
              width="300px"
            />
          </div>
          <div className="flex flex-col w-[200px] mt-5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Gap Day
              <span className="text-[13px] text-[rgba(0,0,0,0.5)]">(days)</span>
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
        <div className="grid mt-5 mb-7 w-[45vw]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Description
          </label>
          <textarea
            name=""
            id=""
            rows="3"
            placeholder="A luxurious facial treatment designed to rejuvenate and revitalize your skin."
            className="border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            style={{
              padding: "12px",
              resize: "none",
            }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>

        <div className="mt-10">
          <label className="text-[17px] mb-0.5 text-(--color-title-70) font-semibold">
            Service Detail
          </label>
          <div className="w-full">
            <div className="rounded-[.375rem] mt-3 gap-2.5 flex flex-wrap">
              {serviceDetails &&
                serviceDetails.map((item, index) => (
                  <ServiceDetailCard
                    handleOnClick={handleOnclick}
                    serviceDetail={item}
                    index={index}
                  />
                ))}
              <ServiceDetailCard handleOnClick={handleOnclick} />
            </div>
            {showModalServiceDetail && (
              <Popup>
                <ServiceDetailModal
                  left={left}
                  handleCloseModal={() => setShowModalServiceDetail(false)}
                  setServiceDetails={setServiceDetails}
                  serviceDetails={serviceDetails}
                  serviceDetailUpdateIndex={serviceDetailUpdateIndex}
                  setServiceDetailUpdateIndex={setServiceDetailUpdateIndex}
                  serviceDetailUpdate={serviceDetailUpdate}
                  setServiceDetailUpdate={setServiceDetailUpdate}
                />
              </Popup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
