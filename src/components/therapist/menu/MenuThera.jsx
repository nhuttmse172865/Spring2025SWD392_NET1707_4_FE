import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ICONS from "../../../constants/icons";

const MenuThera = () => {
  const [itemActive, setItemActive] = useState(null);
  const [itemHover, setItemHover] = useState(null);
  const navigate = useNavigate();

  const handleOnclickItem = (index, name) => {
    setItemActive(index);
    if (name === "Dashboard") {
      navigate("/therapist");
    } else if (name === "Profile") {
      navigate("/therapist/profile");
    } else if (name === "Schedule") {
      navigate("/therapist/schedule");
    }else if (name === "Record result") {
      navigate("/therapist/record");
    }
  };

  const handleHoverItem = (index) => {
    setItemHover(index);
  };

  const handleLeaveItem = () => {
    setItemHover(null);
  };

  const menuItems = [
    { name: "Dashboard", icon: ICONS.dashboard, iconActive: ICONS.dashboardActive },
    { name: "Schedule", icon: ICONS.schedule, iconActive: ICONS.scheduleActive },
    { name: "Record result", icon: ICONS.appointment, iconActive: ICONS.appointmentActive },
  ];

  return (
    <div className="manager-list-navigation">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              onClick={() => handleOnclickItem(index, item.name)}
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
  );
};

export default MenuThera;
