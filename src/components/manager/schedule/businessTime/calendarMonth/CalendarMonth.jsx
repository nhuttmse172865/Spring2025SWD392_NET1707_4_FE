import React, { useEffect, useState } from "react";
import CALENDAR from "../../../../../constants/calendar";
import ICONS from "../../../../../constants/icons";
import Day from "./day/Day";

const CalendarMonth = ({ setShowModal, setDateSelected }) => {
  const [days, setDays] = useState();

  const [todayDate, setTodayDate] = useState(new Date());
  const todayMonth = todayDate.getMonth();
  const todayYear = todayDate.getFullYear();

  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInMonthPrevious = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfMonth =
    new Date(currentYear, currentMonth, 1).getDay() === 0
      ? 7
      : new Date(currentYear, currentMonth, 1).getDay();

  const getCalendars = (month, year) => {
    const _days = [];
    const numberDaysMonthPrevious = firstDayOfMonth - 1;
    const dateMonthPrevious = daysInMonthPrevious - numberDaysMonthPrevious;
    for (let i = dateMonthPrevious + 1; i <= daysInMonthPrevious; i++) {
      _days.push(i);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      _days.push(i);
    }
    let length = Math.ceil(_days.length / 7) * 7 - _days.length;
    for (let i = 1; i <= length; i++) {
      _days.push(i);
    }
    return _days;
  };

  const handleCreateBusinessTime = (day, currentMonth,currentYear) => {
    setDateSelected(new Date(currentYear,currentMonth,day))
    setShowModal(true)
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    clearSelectedDate();
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    clearSelectedDate();
  };
  useEffect(() => {
    setDays(getCalendars(currentMonth, currentYear));
  }, [currentDate]);
  return (
    <div className="w-full bg-white rounded-[.375rem] p-2.5 relative">
      <div className="header-calendar-month flex justify-center items-center h-[50px] gap-[50px]">
        <div className="w-[30px] h-[30px] bg-[rgba(0,0,0,0.03)]  flex justify-center items-center rounded-[.375rem] relative">
          <img
            src={ICONS.arrow}
            alt=""
            className="cursor-pointer"
            onClick={() => handlePrevMonth()}
          />
        </div>
        <h6 className="text-[rgba(0,0,0,0.7)] text-[16px]">
          {currentDate.toLocaleString("default", { month: "long" })}-
          {currentYear}
        </h6>
        <div className="w-[30px] h-[30px] bg-[rgba(0,0,0,0.03)]  flex justify-center items-center rounded-[.375rem]">
          <div>
            <img
              src={ICONS.arrow}
              alt=""
              className="rotate-180 cursor-pointer"
              onClick={() => handleNextMonth()}
            />
          </div>
        </div>
      </div>
      <div className="h-[60px] grid grid-cols-7">
        {CALENDAR.WEEK_FULL.map((item) => (
          <div className="flex justify-center items-center text-[15px] text-(--color-primary-100) bg-(--color-primary-10)">
            {item}
          </div>
        ))}
      </div>

      <div
        className="grid"
        style={{
          height: "calc(100% - 110px)",
          overflow: "hidden",
        }}
      >
        {days &&
          Array.from({ length: Math.ceil(days.length / 7) }).map(
            (_, rowIndex) => (
              <div className=" grid-cols-7 w-full grid h-full relative ">
                {Array.isArray(days) &&
                  days
                    .slice(rowIndex * 7, rowIndex * 7 + 7)
                    .map((day, dayIndex) => (
                      <Day 
                      dayIndex={dayIndex}
                      firstDayOfMonth={firstDayOfMonth}
                      daysInMonth={daysInMonth}
                      rowIndex={rowIndex}
                      day={day}
                      currentMonth={currentMonth}
                      currentYear={currentYear}
                      todayDate={todayDate}
                      todayMonth={todayMonth}
                      todayYear={todayYear}
                      handleCreateBusinessTime={handleCreateBusinessTime}
                      />
                    ))}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default CalendarMonth;
