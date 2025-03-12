import React from "react";
import OutlineButton from "../../../../common/button/outline/OutlineButton";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import Select from "../../../../common/select/Select";
import InputImage from "../modal/add/inputImage/InputImage";
import Table from "./table/Table";

const ModalUpdate = () => {
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
                />
              </div>
              <div className="grid w-[250px] mt-5">
                <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                  Category
                </label>
                <Select
                  modeShowTextOnInput={false}
                  mutilpleSelect={false}
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
                {/* {issueSkin &&
              issueSkin.map((item, index) => (
                <span
                  className="w-fit h-fit px-4 rounded-[.375rem] text-[14px] text-white bg-(--color-primary-80)"
                  key={index}
                >
                  {item}
                </span>
              ))} */}
              </div>
              <Select
                modeShowTextOnInput={true}
                mutilpleSelect={true}
                text="Select issue skin"
                width="250px"
              />
            </div>
            <div className="grid mt-5 mb-7">
              <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                Skin Type
              </label>
              <div className="flex gap-2.5 p-1 flex-wrap">
                {/* {skinType &&
                  skinType.map((item, index) => (
                    <span
                      className="w-fit h-fit px-4 rounded-[.375rem] text-[14px] text-white bg-(--color-primary-80)"
                      key={index}
                    >
                      {item}
                    </span>
                  ))} */}
              </div>
              <Select
                modeShowTextOnInput={true}
                mutilpleSelect={true}
                text="Select skin type"
                width="200px"
              />
            </div>
            <div className="flex gap-10 items-end">
              <div className="flex flex-col">
                <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
                  Therapist
                </label>
                <div className="flex gap-2.5 p-1 flex-wrap">
                  {/* {therapist &&
                  therapist.map((item, index) => (
                    <span
                      className="w-fit h-fit px-4 rounded-[.375rem] text-[14px] text-white bg-(--color-primary-80)"
                      key={index}
                    >
                      {item}
                    </span>
                  ))} */}
                </div>
                <Select
                  modeShowTextOnInput={true}
                  mutilpleSelect={true}
                  text="Select therapist"
                  width="300px"
                />
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
                placeholder="A luxurious facial treatment designed to rejuvenate and revitalize your skin."
                className="border-input-form-login text-[rgba(0,0,0,0.8)] text-[15px]"
                style={{
                  padding: "12px",
                  resize: "none",
                }}
              ></textarea>
            </div>
          </div>
          <div className="w-[50%] bg-amber-300">
            {/* {images &&
                images.map((item, index) => (
                  <InputImage
                    key={index}
                    width="100px"
                    height="100px"
                    imageObject={item}
                    index={index}
            
                  />
                ))} */}
            <InputImage width="100px" height="100px" />
          </div>
        </div>

        <div className="mt-7 ">
          <label className="text-[16px] mb-0.5 text-[rgba(0,0,0,0.7)] font-medium">
            Service Detail
          </label>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
