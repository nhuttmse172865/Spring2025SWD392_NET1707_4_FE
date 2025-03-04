import React from "react";
import CalendarMonth from "../calendarMonth/CalendarMonth";

const Content = ({setShowModal, setDateSelected}) => {
  return (
    <div
      className="mt-[20px] flex gap-x-[20px] relative"
      style={{ height: "calc(100vh - 110px)" }}
    >
      <CalendarMonth  setShowModal={setShowModal} setDateSelected={setDateSelected}/>
    </div>
  );
};

export default Content;
