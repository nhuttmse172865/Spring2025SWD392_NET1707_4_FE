import React, { useEffect, useState } from "react";
import InputImage from "../../modal/add/inputImage/InputImage";
import ElevatedButton from "../../../../../common/button/elevated/ElevatedButton";
import ICONS from "../../../../../../constants/icons";
import Step from "../step/Step";
import axios from "axios";
import BASE from "../../../../../../constants/base";
import DEEP_COMPARE_OBJECTS from "../../../../../../helpers/DeepCompareObject";

const ModalUpdateServiceDetail = ({
  setShowModalUpdate,
  itemUpdate,
  setRefreshData,
  serviceId
}) => {
  const [loading, setLoading] = useState(false);
  const [serviceDetailId, setServiceDetailId] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [description, setDescription] = useState();
  const [steps, setSteps] = useState([]);
  const [images, setImages] = useState([]);
  const [stepsList, setStepsList] = useState();
  const [refreshImage, setRefreshImage] = useState(false);
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

  const handleDeleteImage = (index) => {
    
    setImages(images.filter((_,_index) => _index !== index))
    setRefreshImage(prev => !prev)
  }

  const handleFetchSteps = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/service-detail-step/getByServiceDetailId?id=${serviceDetailId}`
      );
      if (!response || response.status !== 200) throw new Error();
      setSteps(response.data.data.sort((a, b) => a.stepNumber - b.stepNumber));
      setStepsList(
        response.data.data.sort((a, b) => a.stepNumber - b.stepNumber)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (serviceDetailId) {
      handleFetchSteps();
    }
  }, [serviceDetailId]);

  useEffect(() => {
    setServiceDetailId(itemUpdate.id);
    setName(itemUpdate.name);
    setDescription(itemUpdate.description);
    setPrice(itemUpdate.price);
    setDuration(itemUpdate.duration);
    setSteps(itemUpdate.steps);
    setImages([...itemUpdate.images]);
    console.log(itemUpdate, "itemUpdate.images");
  }, []);

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

  const handleUpdateServiceDetail = async () => {
    setLoading(true);
    const data = {
      name: name,
      description: description,
      price: price,
      duration: duration,
      images: images,
      id: serviceDetailId,
      day_order: itemUpdate.day_order,
    };

    const serviceDetailChange = DEEP_COMPARE_OBJECTS.deepCompareObjects(
      data,
      itemUpdate
    );
    if (!serviceDetailChange) {
      const dataUpdate = {
        day_order: itemUpdate.day_order,
        duration: duration,
        price: price,
        description: description,
        name: name,
        imagesId: [],
        steps: [],
      };
      const image = [];
      const imagesIdAvailable = [];
      images &&
        images.forEach((item) => {
          if (item instanceof File) {
            image.push(item);
          } else {
            imagesIdAvailable.push(item.id);
          }
        });
      const imagesIds = await handleSaveImage(image);
      imagesIds &&
        Array.isArray(imagesIds) &&
        imagesIds.forEach((item) => {
          imagesIdAvailable.push(item.id);
        });
      dataUpdate.imagesId = imagesIdAvailable;
      try {
        console.log(dataUpdate);
        const response = await axios.put(
          `${BASE.BASE_URL}/service-detail/update?id=${serviceDetailId}`,
          dataUpdate
        );
        if (!response || response.status !== 200) throw new Error();
      } catch (error) {
        console.log(error);
      }
    }
    const arrayDifference = DEEP_COMPARE_OBJECTS.findArrayDifferences(
      stepsList,
      steps
    );
    if(arrayDifference.removed.length > 0){
      await Promise.all(
        arrayDifference.removed.map( async item => {
          try {
            const response = await axios.delete(
              `${BASE.BASE_URL}/service-detail-step?id=${item.id}`,
              data
            );
            if (!response || response.status !== 200) throw new Error();
          } catch (error) {
            console.log(error);
          }
        })
      )
    }
    if(arrayDifference.added.length > 0){
      await Promise.all(
        arrayDifference.added.map( async item => {
          const data = {
            name: item.name,
            stepNumber: item.stepNumber,
          };
          try {
            const response = await axios.post(
              `${BASE.BASE_URL}/service-detail-step?serviceDetailId=${serviceId}`,
              data
            );
            if (!response || response.status !== 200) throw new Error();
          } catch (error) {
            console.log(error);
          }
        })
      )
    }
    if(arrayDifference.modified.length > 0){
      await Promise.all(
        arrayDifference.modified.map(async (item) => {
          const data = {
            name: item.name,
            stepNumber: item.stepNumber,
          };
          try {
            const response = await axios.put(
              `${BASE.BASE_URL}/service-detail-step/update?id=${item.id}`,
              data
            );
            if (!response || response.status !== 200) throw new Error();
          } catch (error) {
            console.log(error);
          }
        })
      );
    }
    setRefreshData((prev) => !prev);
    setLoading(false);
    setShowModalUpdate(false);
  };

  return (
    <div className="min-w-[500px] w-[30vw] h-[70vh] bg-white rounded-[.375rem] p-5 overflow-y-scroll absolute">
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        Service Detail
      </h3>
      <img
        onClick={() => setShowModalUpdate(false)}
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
      />
      <div className="mt-10">
        <div className="mb-5 max-w-[40vw]">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Image
          </label>
          <div className="flex flex-wrap gap-5 mt-3">
            {images &&
              images.map((item, index) => (
                <InputImage
                  width="80px"
                  height="80px"
                  imageObject={item}
                  index={index}
                  handleChangeImage={handleAddImage}
                  refreshImage={refreshImage}
                  handleDeleteImage={handleDeleteImage}
                  showDeleteImage={true}
                />
              ))}
            <InputImage
              width="80px"
              height="80px"
              handleChangeImage={handleAddImage}
              refreshImage={refreshImage}
            />
          </div>
        </div>
        <div className="grid max-w-[350px]">
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
          {/* {messageErrorName && (
            <span className="text-[12px] text-red-500">{messageErrorName}</span>
          )} */}
        </div>
        <div className="flex gap-5 mt-5">
          <div className="grid max-w-[160px] relative">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Price
            </label>
            <input
              type="text"
              placeholder="1000 $"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px] w-full"
            />
            {/* {messageErrorPrice && (
              <span className="text-[12px] text-red-500">
                {messageErrorPrice}
              </span>
            )} */}
          </div>
          <div className="grid max-w-[120px]">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Duration
            </label>
            <input
              type="text"
              placeholder="0.5 h"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            />
            {/* {messageErrorDuration && (
              <span className="text-[12px] text-red-500">
                {messageErrorDuration}
              </span>
            )} */}
          </div>
        </div>
        <div className="grid mt-5 mb-7">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Description
          </label>
          <textarea
            name=""
            id=""
            rows="4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Pimples, blackheads, whiteheads, cysts, papules, pustules"
            className="border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            style={{
              padding: "12px",
              resize: "none",
            }}
          ></textarea>
          {/* {messageErrorDescription && (
            <span className="text-[12px] text-red-500">
              {messageErrorDescription}
            </span>
          )} */}
        </div>
        <div className="grid mt-5 mb-7">
          <label className="text-[15px] mb-5 text-[rgba(0,0,0,0.7)] font-semibold">
            Steps
          </label>
          {/* {messageErrorStep && (
            <span className="text-[12px] text-red-500">
              {messageErrorDescription}
            </span>
          )} */}
          <Step stepsAvailable={stepsList} setSteps={setSteps} />
        </div>
      </div>
      <ElevatedButton
        height="50px"
        rounded=".375rem"
        text="Save"
        handleOnclick={handleUpdateServiceDetail}
        isLoading={loading}
      />
    </div>
  );
};

export default ModalUpdateServiceDetail;
