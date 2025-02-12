import React from "react";
import Item from "../item/Item";

const Body = () => {
  return (
    <div
      className="mt-2.5 flex flex-col gap-2.5"
      style={{ height: "calc(100vh - 190px - 3.5rem" }}
    >
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default Body;
