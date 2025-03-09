import React from "react";
import ToolBar from "../../../../components/common/toolBar/ToolBar";
import Content from "../../../../components/manager/account/customer/content/Content";

const Customer = () => {
  return (
    <div className="mt-10">
      <ToolBar isShowElevatedButton={false} isShowOulineButton={false} />
      <div>
        <Content />
      </div>
    </div>
  );
};

export default Customer;
