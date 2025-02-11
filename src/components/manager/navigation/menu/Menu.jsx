import React, { useEffect, useState } from "react";
import "./Menu.css";
import ICONS from "../../../../constants/icons";
import NAVIGATION from "../../../../constants/navigationManger";
import { useNavigate } from "react-router-dom";
import useMapPath from "../../../../hook/useMapPath";

const Menu = () => {
  const navigate = useNavigate();
  const [itemActive, setItemActive] = useState({
    indexMenu: null,
    indexItem: null,
    indexSubItem: null,
  });
  const [itemHover, setItemHover] = useState({
    indexMenu: null,
    indexItem: null,
  });

  const handleOnclickItem = (
    indexMenu,
    indexItem,
    indexSubItem,
    item,
    subItem = null
  ) => {
    if (subItem) {
      navigate(item.path + subItem.path);
    } else {
      if (Array.isArray(item.subItems) && item.subItems.length > 0) {
        navigate(item.path + item.subItems[0].path);
      } else {
        navigate(item.path);
      }
    }
    setItemActive({
      indexMenu: indexMenu,
      indexItem: indexItem,
      indexSubItem: indexSubItem,
    });
  };

  const handleHoverItem = (indexMenu, indexItem) => {
    setItemHover({ indexMenu: indexMenu, indexItem: indexItem });
  };
  const handleLeaveItem = () => {
    setItemHover({ indexMenu: null, indexItem: null });
  };

  useEffect(() => {
    const item = useMapPath(location.pathname)
    setItemActive({
      indexMenu: item.indexMenu,
      indexItem: item.indexItem,
      indexSubItem: item.indexSubItem,
    });
  }, []);

  return (
    <div className="manager-list-navigation">
      {NAVIGATION.LIST_NAVIGATION_MANAGER.map((itemMenu, indexMenu) => (
        <div key={indexMenu}>
          <p>{itemMenu.title}</p>
          <div>
            <ul>
              {itemMenu.data.map((item, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleOnclickItem(indexMenu, index, 0, item)}
                    onMouseEnter={() => handleHoverItem(indexMenu, index)}
                    onMouseLeave={() => handleLeaveItem()}
                    className="manager-navigation-menu-item hover:bg-(--color-primary-10) hover:text-(--color-primary-100) ease duration-300"
                    style={
                      itemActive.indexMenu === indexMenu &&
                      itemActive.indexItem === index
                        ? {
                            backgroundColor: "var(--color-primary-10)",
                            color: "var(--color-primary-100)",
                          }
                        : null
                    }
                  >
                    {(itemActive.indexMenu === indexMenu &&
                      itemActive.indexItem === index) ||
                    (itemHover.indexMenu === indexMenu &&
                      itemHover.indexItem === index) ? (
                      <img src={item.iconActive} />
                    ) : (
                      <img src={item.icon} />
                    )}
                    <span>{item.nameMenu}</span>
                    {(itemActive.indexMenu === indexMenu &&
                      itemActive.indexItem === index &&
                      item.subItems.length > 0) ||
                    (itemHover.indexMenu === indexMenu &&
                      itemHover.indexItem === index &&
                      item.subItems.length > 0) ? (
                      <img
                        className="absolute right-[15px] ease duration-500"
                        style={
                          itemActive.indexItem === index &&
                          itemActive.indexMenu === indexMenu
                            ? { transform: `rotate(${180}deg)` }
                            : { transform: `rotate(${0}deg)` }
                        }
                        src={ICONS.arrowActive}
                      />
                    ) : null}
                  </div>
                  <div
                    className="manager-navigation-menu-sub-item active ease duration-500"
                    style={
                      itemActive.indexMenu === indexMenu &&
                      itemActive.indexItem === index &&
                      item.subItems.length > 0
                        ? {
                            height: `${item.subItems.length * 40 + 20}px`,
                            opacity: 1,
                          }
                        : null
                    }
                  >
                    {item.subItems.map((subItem, indexSubItem) => (
                      <div
                        key={indexSubItem}
                        className={
                          itemActive.indexMenu === indexMenu &&
                          itemActive.indexItem === index &&
                          indexSubItem <= itemActive.indexSubItem
                            ? "manager-navigation-sub-item-content active"
                            : "manager-navigation-sub-item-content"
                        }
                      >
                        <span
                          onClick={() =>
                            handleOnclickItem(
                              indexMenu,
                              index,
                              indexSubItem,
                              item,
                              subItem
                            )
                          }
                          className={
                            itemActive.indexMenu === indexMenu &&
                            itemActive.indexItem === index &&
                            itemActive.indexSubItem === indexSubItem
                              ? "active hover:text-(--color-primary-100)"
                              : "hover:text-(--color-primary-100)"
                          }
                        >
                          {subItem.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
