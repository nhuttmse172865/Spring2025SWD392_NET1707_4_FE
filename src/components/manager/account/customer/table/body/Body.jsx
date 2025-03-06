import React, { useEffect, useState } from "react";
import Item from "../item/Item";
import ROLES from "../../../../../../constants/role";

const Body = ({ listTitle }) => {
  const [accounts, setAccounts] = useState();

  const handleFetchCustomers = async () => {
    try {
      const response = await axios.get(
        `${BASE.BASE_URL}/admin/get-accounts-by-role?roles=${ROLES.CUSTOMER}`
      );
      if (!response || response.status !== 200) throw new Error();
      setAccounts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!accounts) {
      handleFetchCustomers();
    }
  }, []);

  return (
    <div
      className="bg-white rounded-[.375rem] mt-1 scroll-hidden overflow-x-hidden p-0.5 flex flex-col gap-2.5"
      style={{ height: "calc(100vh - 184px - 3.5rem" }}
    >
      {accounts &&
        Array.isArray(accounts) &&
        accounts.map((item, index) => <Item listTitle={listTitle} item={item} index={index} />)}
    </div>
  );
};

export default Body;
