import React from "react";
import Calendar from "./calendar/Calendar";

const CalendarMonth = ({
  setSelectedDate,
  selectedDate,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
  return (
    <div className="w-[500px] bg-white p-5 rounded-[.375rem]">
      <Calendar
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
    </div>
  );
};

export default CalendarMonth;
