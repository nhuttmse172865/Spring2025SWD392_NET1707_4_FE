import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE from "../../../../constants/base";

const AppointmentRate = () => {
  const [ratio, setRatio] = useState();
  const [completed, setCompleted] = useState();
  const [inCompleted, setInCompleted] = useState();

  const handleFetchAppointmentRatio = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/dash-board/appointment-rate`
      );
      if (!response || response.status !== 200) throw new Error();
      const compl = response.data.data.completed;
      const inCompl = response.data.data.inCompleted;
      const _ratio = (Number(compl) / (Number(compl) + Number(inCompl))) * 100;
      console.log(_ratio);
      setCompleted(compl);
      setInCompleted(inCompl);
      setRatio(_ratio);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!ratio) {
      handleFetchAppointmentRatio();
    }
  }, []);

  return (
    <div className="bg-white col-span-5 p-5 ">
      <h6 className="text-[15px] font-medium text-[rgba(0,0,0,0.5)] mb-4">
        Appointment Rate
      </h6>
      {ratio !== undefined && ratio !== null && (
        <div
          className="w-full flex justify-center items-center flex-col  mt-[50px]"
          style={{
            height: "calc(100% - 40px)",
          }}
        >
          <div
            className="relative"
            style={{
              transform: "translateY(-50%)",
            }}
          >
            <div
              className="bg-(--color-primary-100) w-[50px] h-[20px] left-0 absolute top-[100%] z-50"
              style={{
                borderBottomLeftRadius: "50%",
                borderBottomRightRadius: "50%",
                backgroundColor: ratio === 0 ? "#FCF1F6" : null,
              }}
            ></div>
            <div
              className=" bg-[#FCF1F6] w-[50px] h-[20px] right-0 absolute top-[100%] z-50"
              style={{
                borderBottomLeftRadius: "50%",
                borderBottomRightRadius: "50%",
                backgroundColor: ratio === 100 ? "var(--color-primary-100)" : null,
              }}
            ></div>
            <h6
              className="text-[24px] absolute top-[85%] z-50 left-[50%] font-medium text-(--color-primary-100)"
              style={{
                transform: "translateX(-50%)",
              }}
            >
              {ratio && ratio.toFixed(2)}%
            </h6>
            <span
              className="text-[15px] absolute top-[98%] z-50 left-[50%] text-[rgba(0,0,0,0.5)] font-normal"
              style={{
                transform: "translateX(-50%)",
              }}
            >
              Completed
            </span>
            <div
              className="mt-3 w-[150%] absolute top-[120%] z-50 left-[50%] flex gap-x-[40px] justify-center items-center"
              style={{
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex gap-x-[10px] items-center">
                <div className="w-[15px] h-[15px] bg-(--color-primary-100) rounded-[50%]"></div>
                <div className="flex gap-x-[5px] items-center">
                  <span className="text-[14px] text-[rgba(0,0,0,0.5)]">
                    Completed
                  </span>
                  <span className="text-[15px] text-[rgba(0,0,0,0.9)]">
                    {completed && completed}
                  </span>
                </div>
              </div>
              <div className="flex gap-x-[10px] items-center">
                <div className="w-[15px] h-[15px] bg-[#FCF1F6] rounded-[50%]"></div>
                <div className="flex gap-x-[5px] items-center">
                  <span className="text-[14px] text-[rgba(0,0,0,0.5)]">
                    Processing or cancelled
                  </span>
                  <span className="text-[15px] text-[rgba(0,0,0,0.9)]">
                    {inCompleted && inCompleted}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[300px] h-[300px] overflow-hidden flex">
              <div
                className="w-[300px] h-[300px] relative rounded-[50%] "
                style={{
                  top: "100%",
                  transform: "translateY(-50%)",
                }}
              >
                <div
                  className=" w-[300px] h-[300px] rounded-[50%] rotate-180 flex justify-center items-center "
                  style={{
                    background: `conic-gradient(var(--color-primary-100) 0% ${
                      ratio / 2 + 25
                    }%, #FCF1F6 ${ratio / 2 + 25}% 100% )`,
                  }}
                >
                  <div className=" w-[200px] h-[200px] relative rounded-[50%] bg-white z-50 rotate-180 flex flex-col items-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentRate;
