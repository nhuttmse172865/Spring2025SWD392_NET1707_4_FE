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
  const [images, setImages] = useState([]);
  const [refreshImage, setRefreshImage] = useState(false);
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [gapDay,setGapDay] = useState()

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
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleOnclick = (event, serviceDetail, index) => {
    const rect = event.target.getBoundingClientRect();
    setLeft(rect.left);
    setShowModalServiceDetail(true);
    if (serviceDetail) {
      setServiceDetailUpdate(serviceDetail);
      setServiceDetailUpdateIndex(index);
    }
  };

  const handleAddService = () => {
    const data = {
      name: name,
      images: images,
      description: description,
      gapDay: gapDay,

    }
  }

  useEffect(() => {
    if (!categoriesList) {
      handleLoadCategory();
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
              text="Select category"
              width="200px"
            />
          </div>
        </div>

        <div className="grid mt-5 mb-7">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Issue Skin
          </label>
          <Select
            list={issueSkinList && issueSkinList.map((item) => item.name)}
            modeShowTextOnInput={true}
            text="Select issue skin"
            width="250px"
          />
        </div>
        <div className="grid mt-5 mb-7">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Skin Type
          </label>
          <Select
            list={skinTypeList && skinTypeList.map((item) => item.name)}
            modeShowTextOnInput={true}
            text="Select skin type"
            width="200px"
          />
        </div>
        <div className="flex gap-x-5">
          <div className="grid mt-5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Therapist
            </label>
            <Select
              list={therapistList && therapistList.map((item) => item.name)}
              modeShowTextOnInput={true}
              text="Select skin type"
              width="300px"
            />
          </div>
          <div className="grid w-[200px] mt-5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Gap Day <span className="text-[13px] text-[rgba(0,0,0,0.5)]">(days)</span>
            </label>
            <input
              type="number"
              placeholder="Facial Treatment"
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
