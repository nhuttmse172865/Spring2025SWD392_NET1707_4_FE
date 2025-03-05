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
  handleCreateBusinessTime
}) => {
  const [businessTimes, setBusinessTimes] = useState();

  const handleFetchBusinessTime = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/store-business-time/find-by-day?day=${formatDate(
          currentYear,
          currentMonth,
          day
        )}`
      );
      if (!response || response.status !== 200) throw new Error();
      setBusinessTimes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!businessTimes) {
        handleFetchBusinessTime()
    }
  }, [currentMonth,currentYear,day]);

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
      {businessTimes && Array.isArray(businessTimes) && businessTimes.map((item) =>(
        <div>
            
        </div>
      ))}
    </div>
  );
};

export default Day;
