import React, { useState } from "react";
import CalendarWeek from "../calendarWeek/CalendarWeek";
import CalendarMonth from "../calendarMonth/CalendarMonth";

const Content = ({setShowModal, reloadData, setItemUpdate}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedYear, setSelectedYear] = useState();
  return (
    <div
      className="mt-[20px] flex gap-x-[20px] relative"
      style={{ height: "calc(100vh - 110px)" }}
    >
      <CalendarWeek
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        setShowModal={setShowModal}
        reloadData={reloadData}
        setItemUpdate={setItemUpdate}
      />
      <CalendarMonth
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

export default Content;
