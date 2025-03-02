import React, { useEffect, useState } from "react";
import ICONS from "../../../../../../constants/icons";
import CALENDAR from "../../../../../../constants/calendar";

const Calendar = ({
  setSelectedDate,
  selectedDate,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
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

  const handleSelectDate = (_day, rowIndex, dayIndex) => {
    const day =
      Array.isArray(days) && days.filter((_, index) => index === _day);
    if (
      dayIndex + rowIndex * 7 >= firstDayOfMonth - 1 &&
      dayIndex + rowIndex * 7 < daysInMonth + firstDayOfMonth - 1
    ) {
      setSelectedDate(...day);
      setSelectedMonth(currentMonth);
      setSelectedYear(currentYear);
    }

    if (dayIndex + rowIndex * 7 < firstDayOfMonth - 1) {
      setSelectedDate(...day);
      setSelectedMonth(currentMonth - 1);
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
      setSelectedYear(currentYear);
    }

    if (dayIndex + rowIndex * 7 >= daysInMonth + firstDayOfMonth - 1) {
      setSelectedDate(...day);
      setSelectedMonth(currentMonth + 1);
      setSelectedYear(currentYear);
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    }
  };

  const clearSelectedDate = () => {
    setSelectedDate();
    setSelectedMonth();
    setSelectedYear();
  };

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
    <div>
      <div className="header-calendar-month flex justify-between items-center">
        <div className="w-[30px] h-[30px]  flex justify-center items-center rounded-[.375rem] relative">
          <img
            src={ICONS.arrow}
            alt=""
            className="cursor-pointer"
            onClick={() => handlePrevMonth()}
          />
        </div>
        <h6 className="text-[rgba(0,0,0,0.7)] text-[14px]">
          {currentDate.toLocaleString("default", { month: "long" })}-
          {currentYear}
        </h6>
        <div className="w-[30px] h-[30px]  flex justify-center items-center rounded-[.375rem]">
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
      <div className="grid mt-7 gap-6">
        <div className="grid grid-cols-7 w-full">
          {CALENDAR.WEEK.map((item) => (
            <span className="text-center text-[14px] text-[rgba(0,0,0,0.2)]">
              {item}
            </span>
          ))}
        </div>
        {days &&
          Array.from({ length: Math.ceil(days.length / 7) }).map(
            (_, rowIndex) => (
              <div className=" grid-cols-7 w-full  grid">
                {Array.isArray(days) &&
                  days
                    .slice(rowIndex * 7, rowIndex * 7 + 7)
                    .map((day, dayIndex) => (
                      <span
                        className={`text-center text-[14px] cursor-pointer relative ${
                          (day === todayDate.getDate() &&
                            todayMonth === currentMonth &&
                            todayYear === currentYear &&
                            dayIndex + rowIndex * 7 >= firstDayOfMonth - 1 &&
                            dayIndex + rowIndex * 7 <
                              daysInMonth + firstDayOfMonth - 1) ||
                          (day === selectedDate &&
                            selectedMonth === currentMonth &&
                            selectedYear === currentYear &&
                            dayIndex + rowIndex * 7 >= firstDayOfMonth - 1 &&
                            dayIndex + rowIndex * 7 <
                              daysInMonth + firstDayOfMonth - 1)
                            ? "text-(--color-primary-100) font-semibold"
                            : "text-[rgba(0,0,0,0.5)]"
                        }`}
                        style={{
                          color:
                            (rowIndex < 1 && dayIndex < firstDayOfMonth - 1) ||
                            dayIndex + rowIndex * 7 >
                              daysInMonth + firstDayOfMonth - 2
                              ? "rgba(0,0,0,0.2)"
                              : null,
                        }}
                        onClick={() =>
                          handleSelectDate(
                            dayIndex + rowIndex * 7,
                            rowIndex,
                            dayIndex
                          )
                        }
                      >
                        {day}

                        {day === todayDate.getDate() &&
                        todayMonth === currentMonth &&
                        todayYear === currentYear &&
                        dayIndex + rowIndex * 7 >= firstDayOfMonth - 1 &&
                        dayIndex + rowIndex * 7 <
                          daysInMonth + firstDayOfMonth - 1 ? (
                          <div
                            className="absolute w-[5px] h-[5px] bg-(--color-primary-100) rounded-[.375rem]"
                            style={{
                              transform: "translate(-50%, -50%)",
                              left: "50%",
                              top: "100%",
                            }}
                          ></div>
                        ) : null}

                        {day === selectedDate &&
                        selectedMonth === currentMonth &&
                        selectedYear === currentYear &&
                        dayIndex + rowIndex * 7 >= firstDayOfMonth - 1 &&
                        dayIndex + rowIndex * 7 <
                          daysInMonth + firstDayOfMonth - 1 ? (
                          <div
                            className="absolute w-[30px] h-[30px] bg-(--color-primary-10) rounded-[.375rem]"
                            style={{
                              transform: "translate(-50%, -50%)",
                              left: "50%",
                              top: "50%",
                            }}
                          ></div>
                        ) : null}
                      </span>
                    ))}
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Calendar;
