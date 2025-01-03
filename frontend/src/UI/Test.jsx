import React from "react";
import ComboBox from "./AutoComplete";
import BasicSelect from "./BasicSelect";
import { BasicTable } from "./BasicTable";
import { ScrollableTabsButtonAuto } from "./ScollableTab";

export const TestMaterialUI = () => {
  return (
    <div className="mt-5 p-5 bg-white rounded-5 text-center vh-100 container-fluid">
      {/* <div className="mt-5 mb-5">
        <ComboBox />
      </div> */}
      {/* <div className="mt-5 mb-3 w-25">
        <BasicSelect />
      </div> */}
      <div className="mt-5 mb-3">
        <BasicTable />
      </div>
      {/* <div className="mt-5 mb-3">
        <ScrollableTabsButtonAuto/>
      </div> */}
    </div>
  );
};
