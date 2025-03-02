import React, { useEffect, useState } from "react";
import ICONS from "../../../../../constants/icons";
import Calendar from "../calendarMonth/calendar/Calendar";
import Select from "../../../../common/select/Select";
import ElevatedButton from "../../../../common/button/elevated/ElevatedButton";
import useGenerateHours from "../../../../../hook/useGenerateHours";
import axios from "axios";
import BASE from "../../../../../constants/base";
import formatDate from "../../../../../helpers/FormatDate";

const Modal = ({ setShowModal, setReloadData }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [therapistList, setTherapistList] = useState();
  const [therapist, setTherapist] = useState();
  const [startHour, setStartHour] = useState();
  const [endHour, setEndHour] = useState();
  const [loading, setLoading] = useState(false);

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

  const handleCreateTherapistWorkingTime = async () => {
    setLoading(true);
    try {
      const data = {
        startHour: startHour,
        endHour: endHour,
        day: formatDate(new Date(selectedYear, selectedMonth, selectedDate)),
        therapistId: therapistList.filter(
          (item) => item.account.name === therapist
        )[0].id,
      };

      console.log(data)
      const response = await axios.post(
        `${BASE.BASE_URL}/therapist-working-time/create`,
        data
      );
      if (!response || response.status !== 201) throw new Error();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setReloadData(prev => !prev)
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!therapistList) {
      handleLoadTherapist();
    }
  });
  return (
    <div className="w-[17vw] max-h-[94vh] min-h-[70vh] min-w-[500px] bg-white relative rounded-[.375rem] p-5 overflow-y-scroll">
      <img
        src={ICONS.close}
        alt=""
        className="w-[20px] top-2.5 right-2.5 absolute cursor-pointer"
        onClick={() => setShowModal(false)}
      />
      <h3 className="text-[20px] font-medium text-[rgba(0,0,0,0.5)] ">
        CREATE WORKING TIME
      </h3>
      <div className="flex mt-7 gap-5 flex-col">
        <div className="flex flex-col">
          <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.7)]">
            Therapist
          </label>
          <Select
            list={
              therapistList &&
              therapistList.map((item, index) => item.account.name)
            }
            modeShowTextOnInput={false}
            mutilpleSelect={false}
            setListSelected={setTherapist}
            text="Select therapist"
            width="300px"
          />
        </div>
        <div className="w-[100% mt-2">
          <Calendar
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>

        <div className="w-[100%] mt-5">
          <div className="flex gap-1.5">
            <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
              Date:
            </label>
            <span className="text-[15px] text-(--color-primary-80)">
              {selectedDate
                ? new Date(
                    selectedYear,
                    selectedMonth,
                    selectedDate
                  ).toLocaleDateString("vi-VN")
                : new Date().toLocaleDateString("vi-VN")}
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
                heightFix={400}
                setListSelected={setStartHour}
                list={useGenerateHours(7, 0, 22, 15, 15)}
                isTop={true}
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-[15px] mb-0.5 text-[rgba(0,0,0,0.5)]">
                Start End:
              </label>
              <Select
                text="Select Gender"
                width="200px"
                heightFix={400}
                setListSelected={setEndHour}
                list={useGenerateHours(7, 0, 22, 15, 15)}
                isTop={true}
              />
            </div>
          </div>
        </div>

        <ElevatedButton
          height="50px"
          rounded=".375rem"
          text="Create"
          handleOnclick={handleCreateTherapistWorkingTime}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default Modal;
