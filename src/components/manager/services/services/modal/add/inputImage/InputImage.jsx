import React, { useEffect, useState } from "react";
import ICONS from "../../../../../../../constants/icons";

const InputImage = ({
  height = "100px",
  width = "100px",
  imageObject,
  handleChangeImage,
  refreshImage,
  index,
  backgroundColor = "rgba(0,0,0,0.05)",
  handleDeleteImage,
  showDeleteImage = false,
}) => {
  const [image, setImage] = useState();
  const handleLoadFile = (file) => {
    if (file && typeof file.name === "string") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
        setImage(dataURL);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(file.url);
    }
  };
  useEffect(() => {
    if (imageObject) {
      handleLoadFile(imageObject);
    }
  }, [refreshImage]);

  return (
    <div
      className="rounded-[.375rem] cursor-pointer relative"
      style={{
        height: height,
        width: width,
        backgroundColor: backgroundColor,
      }}
    >
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="w-full h-full opacity-0 absolute cursor-pointer z-20"
        onChange={(event) => handleChangeImage(event, index)}
      />
      {imageObject ? (
        <img src={image} className="w-full h-full z-15 absolute top-0" />
      ) : (
        <img
          src={ICONS.add}
          className="w-full h-full z-10 absolute top-0 max-w-[50px] max-h-[50px]"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {showDeleteImage && (
        <div
          className="w-fit absolute right-[-10px] top-[-10px] z-50"
          onClick={() => handleDeleteImage(index)}
        >
          <img src={ICONS.trash} className="w-[20px] h-[20px]" />
        </div>
      )}
    </div>
  );
};

export default InputImage;
