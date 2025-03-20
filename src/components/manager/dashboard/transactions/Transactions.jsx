import React, { useEffect, useState } from "react";
import Header from "../../../common/table/header/Header";
import DASHBOARD from "../../../../constants/dashboard";
import Item from "./Item/Item";
import axios from "axios";
import BASE from "../../../../constants/base";

const Transactions = () => {
  const [transactions, setTransactions] = useState();

  const handleFetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/dash-board/transactions-newest`
      );
      if (!response || response.status !== 200) throw new Error();
      setTransactions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!transactions) {
      handleFetchTransactions();
    }
  }, []);

  return (
    <div className="col-span-7 bg-white p-5 rounded-[.375rem]">
      <h6 className="text-[15px] font-medium text-[rgba(0,0,0,0.5)] mb-4">
        Transactions
      </h6>
      <Header
        listTitle={DASHBOARD.LIST_TITLE_TRANSACTIONS}
        height={40}
        backgroundColor="#F7F7F7"
        gapX={20}
        textColor="rgba(0,0,0,0.4)"
      />
      <div
        className="mt-1 flex flex-col gap-y-1"
        style={{
          height: "calc(100% - 86px)",
        }}
      >
        {transactions && transactions.map((item, index) => 
          (<Item item={item} index={index}/>)
        )}
      </div>
    </div>
  );
};

export default Transactions;
