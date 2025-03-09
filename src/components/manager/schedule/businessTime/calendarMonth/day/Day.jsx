import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE from "../../../../../../constants/base";
import formatDate from "../../../../../../helpers/FormatDate";

const Day = ({
  dayIndex,
  firstDayOfMonth,
  daysInMonth,
  rowIndex,
  day,
  currentMonth,
  currentYear,
  todayDate,
  todayMonth,
  todayYear,
  handleCreateBusinessTime,
  refreshData,
}) => {
  const [earliestOpenHour, setEarliestOpenHour] = useState();
  const [latestCloseHour, setLatestCloseHour] = useState();

  const handleFetchBusinessTime = async () => {
    if (
      (rowIndex < 1 && dayIndex < firstDayOfMonth - 1) ||
      dayIndex + rowIndex * 7 > daysInMonth + firstDayOfMonth - 2
    )
      return;
    try {
      console.log(formatDate(new Date(currentYear, currentMonth, day)));

      const response = await axios.get(
        `${BASE.BASE_URL}/store-business-time/find-by-day?day=${formatDate(
          new Date(currentYear, currentMonth, day)
        )}`
      );

      if (!response || response.status !== 200) throw new Error();
      const data = response.data.data;
      const earliestOpenHour = data.reduce((earliest, current) =>
        current.openHour < earliest.openHour ? current : earliest
      ).openHour;
      const latestCloseHour = data.reduce((latest, current) =>
        current.closeHour > latest.closeHour ? current : latest
      ).closeHour;
      console.log(response.data.data);

      setEarliestOpenHour(earliestOpenHour);
      setLatestCloseHour(latestCloseHour);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEarliestOpenHour();
    setLatestCloseHour();

    handleFetchBusinessTime();
  }, [currentMonth, currentYear, day, refreshData]);

  return (
    <div
      className="relative"
      style={{
        borderLeft: "1px solid rgba(0,0,0,0.05)",
        borderRight: dayIndex === 6 ? "1px solid rgba(0,0,0,0.05)" : null,
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        backgroundColor:
          (rowIndex < 1 && dayIndex < firstDayOfMonth - 1) ||
          dayIndex + rowIndex * 7 > daysInMonth + firstDayOfMonth - 2
            ? "rgba(0,0,0,0.02)"
            : null,
      }}
      onClick={() => handleCreateBusinessTime(day, currentMonth, currentYear)}
    >
      <span
        className={`absolute top-[10px] left-[10px] text-[14px] ${
          day === todayDate.getDate() &&
          todayMonth === currentMonth &&
          todayYear === currentYear &&
          dayIndex + rowIndex * 7 >= firstDayOfMonth - 1 &&
          dayIndex + rowIndex * 7 < daysInMonth + firstDayOfMonth - 1
            ? "text-(--color-primary-100) font-semibold"
            : "text-[rgba(0,0,0,0.5)]"
        }`}
        style={{
          color:
            (rowIndex < 1 && dayIndex < firstDayOfMonth - 1) ||
            dayIndex + rowIndex * 7 > daysInMonth + firstDayOfMonth - 2
              ? "rgba(0,0,0,0.2)"
              : null,
        }}
      >
        {day}
      </span>
      {earliestOpenHour && latestCloseHour && (
        <div
          className="w-full absolute top-[30px] p-2.5"
          style={{
            height: "calc(100% - 30px)",
          }}
        >
          <div className="w-full bg-(--color-primary-10) rounded-[.375rem] px-2.5">
            <span className="text-(--color-primary-100) text-[14px]">{`${earliestOpenHour.slice(
              0,
              5
            )} - ${latestCloseHour.slice(0, 5)}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Day;
