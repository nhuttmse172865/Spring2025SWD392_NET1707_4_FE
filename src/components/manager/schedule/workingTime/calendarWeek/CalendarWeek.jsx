import React, { useRef } from "react";
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
  reloadData,
  setItemUpdate
}) => {
  const calendarWeek = useRef(null)
  return (
    <div ref={calendarWeek} className="bg-white w-full rounded-[.375rem] h-full relative flex flex-col">
      <Header setShowModal={setShowModal} />
      <Body
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        reloadData={reloadData}
        calendarWeek={calendarWeek}
        setItemUpdate={setItemUpdate}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default CalendarWeek;
