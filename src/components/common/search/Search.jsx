import React from "react";
import ICONS from "../../../constants/icons";
import "./Search.css";

const Search = ({ placeholder = "Search..." }) => {
  return (
    <div
      className="search-common flex items-center justify-end"
    >
      <img src={ICONS.search} />
      <input placeholder={placeholder} />
    </div>
  );
};

export default Search;
