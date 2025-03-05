import React, { useEffect, useState } from "react";
import CALENDAR from "../../../../../../constants/calendar";
import Item from "./item/Item";

const Body = ({ selectedDate, selectedMonth, selectedYear , reloadData}) => {
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [weeks, setWeeks] = useState([]);

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
      console.log(_weeks)
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
        {weeks && currentYear &&currentMonth &&
          CALENDAR.WEEK.map((item, index) => (
            <Item
              index={index}
              day={weeks[index]}
              currentYear={currentYear}
              currentMonth={currentMonth}
              reloadData={reloadData}
            />
          ))}
      </div>
    </div>
  );
};

export default Body;
