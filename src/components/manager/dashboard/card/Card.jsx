import React, { useEffect, useState } from "react";
import DASHBOARD from "../../../../constants/dashboard";
import axios from "axios";
import BASE from "../../../../constants/base";
import formatDate from "../../../../helpers/FormatDate";

const Card = ({ item }) => {
  const [statusActive, setStatusActive] = useState(
    DASHBOARD.STATUS_CHART.WEEKLY
  );
  const [transactions, setTransactions] = useState();
  const [activeChooseStatus, setActiveChooseStatus] = useState(false);

  const handleFetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/dash-board/${item.path}/${
          statusActive.path
        }?date=${formatDate(new Date())}`
      );
      if (!response || response.status !== 200) throw new Error();
      setTransactions(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeStatus = (item) => {
    setStatusActive(item);
  };

  useEffect(() => {
    if (statusActive) {
      handleFetchTransactions();
    }
  }, [statusActive]);

  return (
    <div className="rounded-[.375rem] bg-white p-4 relative overflow-hidden">
      <h6 className="text-[14px] text-[rgba(0,0,0,0.5)]">{item.title}</h6>
      <p className="mt-4 text-[24px] font-medium text-[rgba(0,0,0,0.7)]">
        {transactions ? transactions.value : 0}
        {item.title === "Revenue" ? "$" : null}
      </p>
      {transactions && <span className="text-[13px] text-[rgba(0,0,0,0.5)]">
       <span className={transactions.percentage > 0 ? "text-green-500" : "text-red-500"}>{ transactions.percentage > 0 ? "+" : "-"}{transactions.percentage}%</span> vs last {statusActive && statusActive.subName}
      </span>}
      <div className="absolute right-4 bottom-4 w-[24px] h-[24px]">
        <img src={item.icon} />
      </div>

      <div
        className="absolute right-4 top-4 min-w-[80px] border-input-form-login rounded-[.375rem] px-2.5 cursor-pointer flex justify-center items-center"
        onClick={() => setActiveChooseStatus((prev) => !prev)}
      >
        <span className="text-[13px] text-[rgba(0,0,0,0.5)]">
          {statusActive && statusActive.name}
        </span>
        {activeChooseStatus && (
          <ul className="absolute border-input-form-login w-full left-0 top-[100%] px-2.5 bg-white mt-1 z-[500]">
            {Object.values(DASHBOARD.STATUS_CHART).map((_item) => (
              <li
                onClick={() => handleChangeStatus(_item)}
                className="text-[12px] text-[rgba(0,0,0,0.5)] py-1 hover:text-(--color-primary-100)"
              >
                {_item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Card;
