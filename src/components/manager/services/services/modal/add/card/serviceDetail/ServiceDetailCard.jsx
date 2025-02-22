import React, { useEffect, useState } from "react";
import ICONS from "../../../../../../../../constants/icons";

const ServiceDetailCard = ({ serviceDetail, handleOnClick, index }) => {
  const [image, setImage] = useState();
  const handleLoadFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
        setImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (serviceDetail) {
      handleLoadFile(serviceDetail.images[0]);
    }
  }, []);

  return (
    <div
      className="w-[330px] min-h-[200px] rounded-[.375rem] p-5 cursor-pointer relative"
      style={{
        boxShadow: serviceDetail ? "0px 0px 3px 1px rgba(0,0,0,0.1)" : null,
        backgroundColor: serviceDetail ? null : "rgba(0,0,0,0.05)",
      }}
      onClick={(event) => handleOnClick(event, serviceDetail, index)}
    >
      {serviceDetail ? (
        <>
          <h4 className="text-[17px] font-semibold text-[rgba(0,0,0,0.5)]">
            {serviceDetail.name}
          </h4>
          <div className="w-full mt-2 h-[150px] rounded-[.375rem]">
            <img src={image} className="w-full h-full object-cover"/>
          </div>
          <p className="text-[14px] limited-lines-3 mt-2 text-[rgba(0,0,0,0.5)]">
            {serviceDetail.description}
          </p>
          <div className="mt-3 flex justify-between items-end">
            <span className="text-[17px] text-[rgba(0,0,0,0.6)] font-medium">
              {serviceDetail.price}
            </span>
            <div className="flex justify-between gap-2.5">
              <img src={ICONS.time} className="w-[20px] h-[20px]" />
              <span className="text-[14px] text-[rgba(0,0,0,0.5)]">
                {serviceDetail.duration} hour
              </span>
            </div>
          </div>
        </>
      ) : (
        <img
          src={ICONS.add}
          className="w-100px] h-[100px] absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      )}
    </div>
  );
};

export default ServiceDetailCard;
