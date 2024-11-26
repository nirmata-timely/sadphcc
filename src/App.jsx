import "./all.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./loadpage";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import CreateCaregiverAcc from "./pages/CreateCaregiverAcc";
import CreateElderProfile from "./pages/CreateElderProfile";
import Tasks from "./pages/Tasks";
import Caregivers from "./pages/Caregivers";
import Patients from "./pages/Patients";
import ViewCg from "./pages/ViewCg";
import Logs from "./pages/Logs";
import Side from "./pages/dashboard/side";
import Content from "./pages/contents/content";
import Upnav from "./pages/dashboard/upnav";
import Card from "./pages/contents/card";
import List from "./pages/contents/list";
import Notifications from "./pages/contents/notifications";
import Adl from "./pages/activity/adl";
import Pie from "./pages/activity/pie";
import Attendance from "./pages/dashboard/attendance";
import Attsummary from "./pages/dashboard/attSummary";
import Profiles from "./pages/dashboard/Profiles";
import Adldash from "./pages/dashboard/adldash";
import Assigned from "./pages/activity/assigned";
import Assto from "./pages/activity/assto";
import Notes from "./pages/activity/notes";
import Tasklist from "./pages/activity/tasklist";
import Taskslist from "./pages/activity/taskslist";
import Addtasks from "./pages/activity/addtasks";
import Createaccount from "./pages/activity/createAccounts";
import Box from "./pages/activity/box";
import Notes1 from "./pages/activity/notes";
import Viewadl from "./pages/viewAdl";
import Morning from "./pages/activity/morning";
import Afternoon from "./pages/activity/afternoon";
import Evening from "./pages/activity/evening";
import Vitalsigns from "./pages/activity/vitalsigns";
import PatAdl from "./pages/activity/patAdl";
import ProgressPie from "./pages/activity/progressPie";
import Room from "./pages/dashboard/room";
import Manageroom from "./pages/dashboard/manageroom";
import ViewPatinfo from "./pages/viewPatinfo";
import Taskassign from "./pages/activity/taskassign";
import Createtaskassign from "./pages/activity/createtaskassign";
import Settings from "./pages/Settings";
import Accounts from "./pages/settings/accounts";
import Reports from "./pages/activity/reports";
import CaregiversCompletion from "./pages/activity/CaregiversCompletion";
import TimeofDay from "./pages/dashboard/timeofDay";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/Tasks" element={<Tasks />} />
        <Route path="/Caregivers" element={<Caregivers />} />
        <Route path="/CreateCaregiverAcc" element={<CreateCaregiverAcc />} />
        <Route path="/createtaskassign" element={<Createtaskassign />} />
        <Route path="/viewCg/:id" element={<ViewCg />} />
        <Route path="/Patients" element={<Patients />} />
        <Route path="/CreateElderProfile" element={<CreateElderProfile />} />
        <Route path="/Logs" element={<Logs />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/Side" element={<Side />} />
        <Route path="/Upnav" element={<Upnav />} />
        <Route path="/Content" element={<Content />} />
        <Route path="/Card" element={<Card />} />
        <Route path="/List" element={<List />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Adl" element={<Adl />} />
        <Route path="/Adldash" element={<Adldash />} />
        <Route path="/pie" element={<Pie />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/attSummary" element={<Attsummary />} />
        <Route path="/tasklist" element={<Tasklist />} />
        <Route path="/assigned" element={<Assigned />} />
        <Route path="/taskassign" element={<Taskassign />} />
        <Route path="/assto" element={<Assto />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/tasklist" element={<Tasklist />} />
        <Route path="/taskslist" element={<Taskslist />} />
        <Route path="/addtasks" element={<Addtasks />} />
        <Route path="/createAccount" element={<Createaccount />} />
        <Route path="/box" element={<Box />} />
        <Route path="/notes1" element={<Notes1 />} />
        <Route path="/viewAdl" element={<Viewadl />} />
        <Route path="/viewPatinfo" element={<ViewPatinfo />} />
        <Route path="/morning" element={<Morning />} />
        <Route path="/afternoon" element={<Afternoon />} />
        <Route path="/evening" element={<Evening />} />
        <Route path="/vitalsigns" element={<Vitalsigns />} />
        <Route path="/patadl" element={<PatAdl />} />
        <Route path="/progressPie" element={<ProgressPie />} />
        <Route path="/Room" element={<Room />} />
        <Route path="/Manageroom" element={<Manageroom />} />
        <Route path="/reports" element={<Reports />} />
        <Route
          path="/CaregiversCompletion"
          element={<CaregiversCompletion />}
        />
        <Route path="/timeofDay" element={<TimeofDay />} />
      </Routes>
    </Router>
  );
};

export default App;

/**
        <Route path="/ViewCg" element={<ViewCg />} /> */
