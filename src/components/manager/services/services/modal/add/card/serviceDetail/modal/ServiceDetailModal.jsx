import React, { useState } from "react";
import ICONS from "../../../../../../../../../constants/icons";
import InputImage from "../../../inputImage/InputImage";
import Step from "../../../step/Step";
import ElevatedButton from "../../../../../../../../common/button/elevated/ElevatedButton";

const ServiceDetailModal = ({ left, handleCloseModal }) => {
  const [images, setImages] = useState([]);
  const [refreshImage, setRefreshImage] = useState(false);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [description, setDescription] = useState();
  const [steps, setSteps] = useState([]);
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

  const handleOnclickSave = () => {
    const data = {
      name: name,
      description: description,
      price: price,
      duration: duration,
      steps: steps,
      images: images
    };
    console.log(data);
  };

  return (
    <div
      className="w-[30vw] h-[70vh] bg-white rounded-[.375rem] p-5 overflow-y-scroll absolute"
      style={{
        left: left,
      }}
    >
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        Service Detail
      </h3>
      <img
        onClick={() => handleCloseModal()}
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
                />
              ))}
            <InputImage
              width="80px"
              height="80px"
              handleChangeImage={handleAddImage}
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
        </div>
        <div className="flex gap-5 mt-5">
          <div className="grid max-w-[160px]">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
              Price
            </label>
            <input
              type="text"
              placeholder="1000 $"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-12 border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
            />
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
        </div>
        <div className="grid mt-5 mb-7">
          <label className="text-[15px] mb-5 text-[rgba(0,0,0,0.7)] font-semibold">
            Steps
          </label>
          <Step setSteps={setSteps} />
        </div>
      </div>
      <ElevatedButton
        height="50px"
        rounded=".375rem"
        text="Save"
        handleOnclick={handleOnclickSave}
      />
    </div>
  );
};

export default ServiceDetailModal;
