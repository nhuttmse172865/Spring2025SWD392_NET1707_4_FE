import { useEffect, useState } from "react";

const useGenerateHours = (
  startHour,
  startMinute,
  endHour,
  endMinute,
  intervalMinutes
) => {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const generateHoursArray = () => {
      const result = [];
      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute <= endMinute)
      ) {
        const formattedHour = `${String(currentHour).padStart(2, "0")}:${String(
          currentMinute
        ).padStart(2, "0")}`;
        result.push(formattedHour);

        currentMinute += intervalMinutes;
        if (currentMinute >= 60) {
          currentHour++;
          currentMinute -= 60;
        }
      }

      setHours(result);
    };

    generateHoursArray();
  }, [startHour, startMinute, endHour, endMinute, intervalMinutes]);

  return hours;
};

export default useGenerateHours;
