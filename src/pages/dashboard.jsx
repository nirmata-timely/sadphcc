import React, { useState } from "react";
import Side from "./dashboard/side";
import Upnav from "./dashboard/upnav";
import Attendance from "./dashboard/attendance";
import Profiles from "./dashboard/Profiles";
import Tasklist from "./activity/tasklist";
import Adldash from "./dashboard/adldash";
import Pie from "./activity/pie";
import Addtasks from "./activity/addtasks";
import Box from "./activity/box";
import { BiSolidDashboard } from "react-icons/bi";
import Createaccount from "./activity/createAccounts";
import TimeofDay from "./dashboard/timeofDay";
const dashboard = () => {
  return (
    <div>
      <Side />
      <Box />
      <Createaccount />
      <Addtasks />
      <Pie />
      <TimeofDay />
      <img src="caregiver.png" className="icon"></img>
    </div>
  );
};

export default dashboard;

/**
 * <img src="best.png" className="best"></img>
      <img src="caregiver.png" className="icon"></img>
 * 
 * <Tasklist /> 
 * 
      <Attendance />
      <Profiles />
*/
