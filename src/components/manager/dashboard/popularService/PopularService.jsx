import React, { useEffect, useState } from "react";
import Header from "../../../common/table/header/Header";
import DASHBOARD from "../../../../constants/dashboard";
import Item from "./item/Item";
import axios from "axios";
import BASE from "../../../../constants/base";

const PopularService = () => {
  const [popularService, setPopularService] = useState();

  const handleFetchPopularService = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/dash-board/services-popularity`
      );
      if (!response || response.status !== 200) throw new Error();
      setPopularService(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!popularService){
      handleFetchPopularService()
    }
  },[])

  return (
    <div className="bg-white col-span-4 rounded-[.375rem] relative p-5">
      <h6 className="text-[15px] font-medium text-[rgba(0,0,0,0.5)] mb-4">
        Popular Services
      </h6>
      <Header
        listTitle={DASHBOARD.LIST_TITLE_POPULAR_SERVICES}
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
        {popularService && popularService.map((item,index) => (
          <Item  item={item} index={index}/>
        ))}
        
      </div>
    </div>
  );
};

export default PopularService;
