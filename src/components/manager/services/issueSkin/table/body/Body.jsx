import React from "react";
import Item from "../item/Item";
import useLocalStorage from "use-local-storage";
import LOCALSTORAGE_NAME from "../../../../../../constants/localStorageName";

const Body = ({ issueSkins, setShowModal, setItemUpdate }) => {
  const [issueSkinItemsActive, setIssueSkinItemActive] = useLocalStorage(
    LOCALSTORAGE_NAME.ISSUE_SKIN_ITEMS_ACTIVE,
    ""
  );
  const handleOnclickItem = (item) => {
    if (
      issueSkinItemsActive &&
      Array.isArray(issueSkinItemsActive) &&
      issueSkinItemsActive.includes(item)
    ) {
      setIssueSkinItemActive(
        issueSkinItemsActive.filter(
          (element) => element !== item
        )
      );
    } else {
      setIssueSkinItemActive([...issueSkinItemsActive, item]);
    }
  };

  return (
    <div
      className="mt-2.5 flex flex-col gap-2.5"
      style={{ height: "calc(100vh - 190px - 3.5rem" }}
    >
      {issueSkins &&
        Array.isArray(issueSkins) &&
        issueSkins.map((item) => (
          <Item
            item={item}
            setShowModal={setShowModal}
            setItemUpdate={setItemUpdate}
            handleOnClick={handleOnclickItem}
            active={issueSkinItemsActive.includes(item)}
          />
        ))}
    </div>
  );
};

export default Body;
