import React, { useEffect, useState } from "react";
import CALENDAR from "../../../../../../constants/calendar";
import Item from "./item/Item";
import TIME_CACULATE from "../../../../../../helpers/TimeCaculate";

const Body = ({ selectedDate, selectedMonth, selectedYear, reloadData, calendarWeek, setItemUpdate , setShowModal}) => {
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [weeks, setWeeks] = useState([]);
  const [itemHover, setItemHover] = useState();
  const [location,setLocation] = useState()

  const getWeekDate = (
    currentDate,
    currentDay,
    daysInMonth,
    daysInMonthPrevious
  ) => {
    let _week = [];
    const datePrevious =
      currentDay === 0 ? currentDate - 7 : currentDate - currentDay;
    if (datePrevious < 0) {
      for (
        let i = daysInMonthPrevious - Math.abs(datePrevious) + 1;
        i <= daysInMonthPrevious;
        i++
      ) {
        _week.push(i);
      }
      for (let i = 1; i <= 31; i++) {
        if (_week.length >= 7) break;
        _week.push(i);
      }
    } else {
      for (let i = datePrevious + 1; i < currentDate; i++) {
        _week.push(i);
      }
      for (let i = currentDate; i <= daysInMonth; i++) {
        if (_week.length >= 7) break;
        _week.push(i);
      }
      if (_week.length < 7) {
        for (let i = 1; i <= 31; i++) {
          if (_week.length >= 7) break;
          _week.push(i);
        }
      }
    }
    return _week;
  };

  useEffect(() => {
    if (!weeks.length) {
      const currentDate = new Date();
      const _currentYear = currentDate.getFullYear();
      const _currentMonth = currentDate.getMonth();
      const daysInMonth = new Date(
        _currentYear,
        _currentMonth + 1,
        0
      ).getDate();
      const daysInMonthPrevious = new Date(
        _currentYear,
        _currentMonth,
        0
      ).getDate();

      const _weeks = getWeekDate(
        currentDate.getDate(),
        currentDate.getDay(),
        daysInMonth,
        daysInMonthPrevious
      );
      console.log(_weeks);
      setCurrentMonth(_currentMonth);
      setCurrentYear(_currentYear);
      setWeeks(_weeks);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedYear, selectedMonth, selectedDate).getDay();
      const daysInMonth = new Date(
        selectedYear,
        selectedMonth + 1,
        0
      ).getDate();
      const daysInMonthPrevious = new Date(
        selectedYear,
        selectedMonth,
        0
      ).getDate();
      setCurrentMonth(selectedMonth);
      setCurrentYear(selectedYear);
      setWeeks(
        getWeekDate(selectedDate, date, daysInMonth, daysInMonthPrevious)
      );
    }
  }, [selectedDate, selectedMonth, selectedYear]);

  return (
    <div className="w-full pl-[40px]" style={{ height: "calc(100% - 25px)" }}>
      <div className="grid w-full grid-cols-7 h-[50px] p-2.5">
        {weeks &&
          weeks.length > 0 &&
          CALENDAR.WEEK.map((item, index) => (
            <div className="h-[50px] flex justify-center items-center text-[14px] text-(--color-primary-100) bg-(--color-primary-10)">
              {`${item} - ${weeks[index]}`}
            </div>
          ))}
      </div>
      <div
        className="grid w-full grid-cols-7 p-2.5 mt-2.5 pt-[1px]"
        style={{ height: "calc(100% - 60px)" }}
      >
        {weeks &&
          currentYear &&
          currentMonth &&
          CALENDAR.WEEK.map((item, index) => (
            <Item
              index={index}
              day={weeks[index]}
              currentYear={currentYear}
              currentMonth={currentMonth}
              reloadData={reloadData}
              setItemHover={setItemHover}
              setLocation={setLocation}
              calendarWeek={calendarWeek}
              setItemUpdate={setItemUpdate}
              setShowModal={setShowModal}
            />
          ))}
      </div>
      {itemHover && 
      <div className="min-w-[200px] max-w-[230px] min-h-[100px] bg-white absolute right-0 top-0 border-input-form-login p-2.5 duration-300 ease-linear"
      style={{
        top: location?.top,
        left: location?.left,
        transform: "translate(20px,-100%)",
      }}
      >
        <div className="flex items-center gap-x-1.5">
          <div>
            <div className="w-[30px] h-[30px] bg-[#F7F7F7] rounded-[50%] overflow-hidden object-contain">
              <img src={itemHover?.therapist?.images[0]?.url} />
            </div>
          </div>
          <div>
            <h6 className="text-[13px] text-[rgba(0,0,0,0.5)]">
              {itemHover && itemHover?.therapist?.account?.name}
            </h6>
            <span className="text-[13px] text-[rgba(0,0,0,0.6)]">
              {itemHover && itemHover?.therapist?.account?.email}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-[13px] text-[rgba(0,0,0,0.5)]">Date: <span className="text-(--color-primary-100)">{itemHover?.day}</span></span> <br/>
          <span className="text-[13px] text-[rgba(0,0,0,0.5)]">
            Working Hour:{" "}
            <span className="text-(--color-primary-100)">
              {`${TIME_CACULATE.minutesToTime(
                itemHover?.startHour
              )}-${TIME_CACULATE.minutesToTime(itemHover?.endHour)}`}
            </span>
          </span>
        </div>
      </div>}
    </div>
  );
};

export default Body;
