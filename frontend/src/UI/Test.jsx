import React from "react";
import ComboBox from "./AutoComplete";
import BasicSelect from "./BasicSelect";
import { BasicTable } from "./BasicTable";
import { ScrollableTabsButtonAuto } from "./ScollableTab";
import { RealTimeChat } from "../pages/RealtimeChat";

export const TestMaterialUI = () => {
  return (
    <div className="mt-5 p-5 rounded-2 text-center vh-100 container-fluid bg-success">
      {/* <div className="mt-5 mb-5">
        <ComboBox />
      </div> */}
      {/* <div className="mt-5 mb-3 w-25">
        <BasicSelect />
      </div> */}
      {/* <div className="mt-5 mb-3">
        <BasicTable />
      </div> */}
      {/* <div className="mt-5 mb-3">
        <ScrollableTabsButtonAuto/>
      </div> */}

      <div className="mt-5 mb-3 p-5 m-5">
        <RealTimeChat />
      </div>
    </div>
  );
};
