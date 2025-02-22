import React from "react";
import ICONS from "../../../../../../../../constants/icons";

const ServiceDetailCard = ({ serviceDetail, handleOnClick }) => {
  return (
    <div
      className="w-[400px] min-h-[300px] rounded-[.375rem] p-5 cursor-pointer relative"
      style={{
        boxShadow: serviceDetail ? "0px 0px 3px 1px rgba(0,0,0,0.1)" : null,
        backgroundColor: serviceDetail ? null : "rgba(0,0,0,0.05)",
      }}
      onClick={(event) => handleOnClick(event)}
    >
      {serviceDetail ? (
        <>
          <h4 className="text-[17px] font-semibold text-[rgba(0,0,0,0.5)]">
            Name
          </h4>
          <div className="w-full bg-amber-100 mt-2 h-[150px] rounded-[.375rem]"></div>
          <p className="text-[14px] limited-lines-3 mt-2 text-[rgba(0,0,0,0.5)]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
          <div className="mt-3 flex justify-between items-end">
            <span className="text-[17px] text-[rgba(0,0,0,0.6)] font-medium">
              1000$
            </span>
            <div className="flex justify-between gap-2.5">
              <img src={ICONS.time} className="w-[20px] h-[20px]" />
              <span className="text-[14px] text-[rgba(0,0,0,0.5)]">
                25 hour
              </span>
            </div>
          </div>
        </>
      ) : (
        <img src={ICONS.add} className="w-100px] h-[100px] absolute" style={{
            top:"50%",
            left:"50%",
            transform: "translate(-50%,-50%)"
        }} />
      )}

  
    </div>
  );
};

export default ServiceDetailCard;
