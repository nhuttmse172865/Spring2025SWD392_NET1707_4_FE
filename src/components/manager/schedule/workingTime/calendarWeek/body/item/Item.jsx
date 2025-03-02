import React, { useEffect, useState } from "react";
import CALENDAR from "../../../../../../../constants/calendar";
import axios from "axios";
import BASE from "../../../../../../../constants/base";
import { format } from "date-fns";
import TIME_CACULATE from "../../../../../../../helpers/TimeCaculate";

const Item = ({ index, day, currentYear, currentMonth, reloadData }) => {
  let timeStart = "7:00";
  let timeEnd = "23:00";
  const [heightSlotTime, setHeightSlotTime] = useState();
  const [workingTimes, setWorkingTimes] = useState();

  const row =
    (TIME_CACULATE.timeToMinutes(timeEnd) -
      TIME_CACULATE.timeToMinutes(timeStart)) /
    15;
  const handleFormatWorkingTimes = (data) => {
    let listSlots = [];

    const intervals =
      Array.isArray(data) &&
      data.map((slot) => ({
        startHour: TIME_CACULATE.timeToMinutes(slot.startHour),
        endHour: TIME_CACULATE.timeToMinutes(slot.endHour),
        id: slot.id,
        day: slot.day,
        status: slot.status,
        therapist: slot.therapist,
      }));
    intervals.map((item) => {
      if (listSlots.length === 0) {
        listSlots.push([item]);
      }
      for (let i = 0; i < listSlots.length; i++) {
        let flag = true;
        listSlots[i].forEach((slot) => {
          if (
            (item.startHour >= slot.startHour &&
              item.startHour <= slot.endHour) ||
            (slot.startHour >= item.startHour && slot.startHour <= slot.endHour)
          ) {
            flag = false;
          }
        });
        if (flag) {
          listSlots[i].push(item);
          break;
        }
      }
      if (
        listSlots.flat().filter((_item) => _item.id === item.id).length === 0
      ) {
        listSlots.push([item]);
      }
    });
    setWorkingTimes(listSlots);
  };

  const handleGetTimeWorkingByDay = async (day) => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/therapist-working-time/get-therapist-times-by-date?date=${day}`
      );
      if (!response || response.status !== 200) throw new Error();
      handleFormatWorkingTimes(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    if (currentMonth && day) {
      setWorkingTimes("");
      handleGetTimeWorkingByDay(
        format(new Date(currentYear, currentMonth, day), "yyyy-MM-dd")
      );
    }
  }, [currentMonth, day, reloadData]);
  useEffect(() => {
    if (!heightSlotTime) {
      const height = document.getElementById(
        "container-day-schedule-working-time"
      )?.children[0].clientHeight;
      setHeightSlotTime(height);
    }
  });

  return (
    <div
      className={`grid grid-cols-1`}
      style={{
        gridTemplateColumns: `repeat(${
          workingTimes?.length ? workingTimes.length : 1
        }, minmax(0, 1fr))`,
      }}
    >
      {workingTimes &&
        Array.isArray(workingTimes) &&
        workingTimes.map((item, subIndex) => (
          <div
            className="flex h-full gap-[1px] relative"
            style={{
              borderLeft: "1px solid rgba(0,0,0,0.05)",
              borderRight:
                subIndex === workingTimes?.length - 1 &&
                index === CALENDAR.WEEK.length - 1
                  ? "1px solid rgba(0,0,0,0.05)"
                  : null,
              borderBottom: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="w-[100%] grid relative"
              id="container-day-schedule-working-time"
            >
              {Array.from({ length: row }).map((_, _index) => (
                <div className="">
                  {index === 0 &&
                  subIndex === 0 &&
                  (_index === 0 ||
                    _index === row / 2 - 1 ||
                    _index === row - 2) ? (
                    <div className="absolute w-[40px] right-[100%] flex justify-end ">
                      <span className="text-[14px] text-[rgba(0,0,0,0.5)] pr-2.5">
                        {_index === 0 ? timeStart : null}
                        {_index === row / 2 - 1 ? timeStart : null}
                        {_index === row - 2 ? timeEnd : null}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            {item &&
              heightSlotTime &&
              Array.isArray(item) &&
              item.map((_slotTime) => (
                <div
                  className="w-[90%] bg-(--color-primary-20) absolute rounded-[.375rem] p-2.5 flex flex-col justify-between cursor-pointer"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    top:
                      heightSlotTime *
                      ((_slotTime.startHour - TIME_CACULATE.timeToMinutes(timeStart)) / 15),
                    height:
                      heightSlotTime *
                      ((_slotTime.endHour - _slotTime.startHour) / 15),
                  }}
                >
                  <div>
                    <h3 className="text-[15px] h-[20px] w-full text-(--color-primary-100) font-medium line-clamp-1">
                      {_slotTime.therapist.account.name}
                    </h3>
                  </div>
                  <span className="text-[14px] text-(--color-primary-100) line-clamp-1">
                    {`${TIME_CACULATE.minutesToTime(
                      _slotTime.startHour
                    )}-${TIME_CACULATE.minutesToTime(_slotTime.endHour)}`}
                  </span>
                </div>
              ))}
          </div>
        ))}
      {workingTimes?.length === 0 ? (
        <div
          className="flex h-full gap-[1px] relative"
          style={{
            borderLeft: "1px solid rgba(0,0,0,0.05)",
            borderRight:
              index === CALENDAR.WEEK.length - 1
                ? "1px solid rgba(0,0,0,0.05)"
                : null,
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <div
            className="w-[100%] grid relative"
            id="container-day-schedule-working-time"
          >
            {Array.from({ length: row }).map((_, _index) => (
              <div className="">
                {index === 0 &&
                (_index === 0 ||
                  _index === row / 2 - 1 ||
                  _index === row - 2) ? (
                  <div className="absolute w-[40px] right-[100%] flex justify-end ">
                    <span className="text-[14px] text-[rgba(0,0,0,0.5)] pr-2.5">
                      {_index === 0 ? timeStart : null}
                      {_index === row / 2 - 1 ? timeStart : null}
                      {_index === row - 2 ? timeEnd : null}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Item;
