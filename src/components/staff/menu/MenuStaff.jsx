import React, { useState } from "react";
import ICONS from "../../../constants/icons";
import { useNavigate } from "react-router-dom";

import "./MenuStaff.css";

const MenuStaff = () => {
  const [itemActive, setItemActive] = useState(null);
  const [itemHover, setItemHover] = useState(null);
  const navigate = useNavigate();

  const handleOnclickItem = (index,name) => {
    setItemActive(index);
    if(name === "Check-in"){
      navigate("/staff/checkin");
  }else if(name === "Check-out"){
    navigate("/staff/checkout");
  }else if(name === "Dashboard"){
    navigate("/staff");
  }else if(name === "CheckoutTherapist"){
    navigate("/staff/checkoutTherapist")
  
}else if(name==="Manage Blog"){
  navigate("/staff/managerBlog")
}
  }

  const handleHoverItem = (index) => {
    setItemHover(index);
  };

  const handleLeaveItem = () => {
    setItemHover(null);
  };

  const menuItems = [
    { name: "Dashboard", icon: ICONS.dashboard, iconActive: ICONS.dashboardActive },
    { name: "Check-in", icon: ICONS.services, iconActive: ICONS.servicesActive },
    { name: "Check-out", icon: ICONS.services, iconActive: ICONS.servicesActive },
    // { name: "datngu", icon: ICONS.services, iconActive: ICONS.servicesActive },
    { name: "CheckoutTherapist", icon: ICONS.services, iconActive: ICONS.servicesActive },
    {name:"Manage Blog" ,icon: ICONS.schedule, iconActive: ICONS.scheduleActive}
  ];

  return (
    <div className="manager-list-navigation">
      <div>
        <ul>
          {menuItems.map((item, index) => (
            
            <li key={index}>
              
              <div
                onClick={() => handleOnclickItem(index,item.name)}
                onMouseEnter={() => handleHoverItem(index)}
                onMouseLeave={handleLeaveItem}
                className="manager-navigation-menu-item hover:bg-(--color-primary-10) hover:text-(--color-primary-100) ease duration-300"
                style={
                  itemActive === index
                    ? {
                        backgroundColor: "var(--color-primary-10)",
                        color: "var(--color-primary-100)",
                      }
                    : null
                }
              >
          
                <img
                  src={itemActive === index || itemHover === index ? item.iconActive : item.icon}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuStaff;
