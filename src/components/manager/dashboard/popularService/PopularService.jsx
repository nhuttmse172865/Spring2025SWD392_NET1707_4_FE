import React from "react";
import Header from "../../../common/table/header/Header";
import DASHBOARD from "../../../../constants/dashboard";
import Item from "./item/Item";

const PopularService = () => {
  return (
    <div className="bg-white col-span-4 rounded-[.375rem] relative p-5">
      <h6 className="text-[17px] font-medium text-[rgba(0,0,0,0.5)] mb-4">
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
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

export default PopularService;
