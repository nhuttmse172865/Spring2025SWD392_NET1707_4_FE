import React from "react";
import Header from "./header/Header";
import Body from "./body/Body";

const CalendarWeek = ({
  setSelectedDate,
  selectedDate,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  setShowModal,
  reloadData
}) => {
  return (
    <div className="bg-white w-full rounded-[.375rem] h-full relative flex flex-col">
      <Header setShowModal={setShowModal} />
      <Body
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        reloadData={reloadData}
      />
    </div>
  );
};

export default CalendarWeek;
