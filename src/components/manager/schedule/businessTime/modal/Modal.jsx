import React, { useState } from "react";
import ICONS from "../../../../../constants/icons";
import Select from "../../../../common/select/Select";
import useGenerateHours from "../../../../../hook/useGenerateHours";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import axios from "axios";
import BASE from "../../../../../constants/base";
import formatDate from "../../../../../helpers/FormatDate";

const Modal = ({ handleCloseModal, dateSelected, setRefreshData }) => {
  const [openHour, setOpenHour] = useState();
  const [closeHour, setCloseHour] = useState();
  const [loading,setLoading] = useState(false)

  const handleCreateBusinessTime = async () => {
    setLoading(true)
    try {
      const data = {
        openHour: openHour,
        closeHour: closeHour,
        day: formatDate(dateSelected),
      };
      const response = await axios.post(
        `${BASE.BASE_URL}/store-business-time/create`,data
      );
      if (!response || response.status !== 201) throw new Error();
      handleCloseModal()
    } catch (error) {
      console.log(error)
    }finally{
      setRefreshData(prev => !prev)
      setLoading(false)
    }
  };

  return (
    <div className="w-[25vw] max-h-[94vh] min-h-[40vh] min-w-[500px] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll">
      <img
        onClick={() => handleCloseModal()}
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
      />
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        STORE BUSINESS TIME
      </h3>
      <div className="w-[100%] mt-10 mb-14">
        <div className="flex gap-1.5">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
            Date:
          </label>
          <span className="text-[15px] text-(--color-primary-80)">
            {dateSelected.toLocaleDateString("vi-VN")}
          </span>
        </div>
        <div className="flex items-center mt-5 gap-5">
          <div className="grid gap-1.5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
              Start Hour:
            </label>
            <Select
              text="Start Hour"
              width="200px"
              heightFix={150}
              list={useGenerateHours(1, 0, 23, 0, 15)}
              setListSelected={setOpenHour}
              isTop={true}
            />
          </div>
          <div className="grid gap-1.5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
              End Hour:
            </label>
            <Select
              text="Select Gender"
              width="200px"
              heightFix={150}
              list={useGenerateHours(1, 0, 23, 0, 15)}
              setListSelected={setCloseHour}
              isTop={true}
            />
          </div>
        </div>
      </div>
      <ElevatedButton
        height="50px"
        rounded=".375rem"
        width="300px"
        text="Create"
        isLoading={loading}
        handleOnclick={handleCreateBusinessTime}
      />
    </div>
  );
};

export default Modal;
