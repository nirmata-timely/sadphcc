import React from "react";
import { BiSolidDashboard, BiTask } from "react-icons/bi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdElderlyWoman } from "react-icons/md";
import { TbLogs, TbLogout } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useContext } from "react";
import axios from "axios";

const side = () => {
  const handleLogout = async () => {
    const username = localStorage.getItem("username");
    console.log(`Logout request received for user: ${username}`);

    try {
      await axios.post("http://localhost:5124/logout", { username });
      localStorage.removeItem("username");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error?.message);
    }
  };

  return (
    <div>
      <div className="side-nav">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <img src="sadphcc.png" className="saint"></img>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <a
          href="/Dashboard"
          className={location.pathname === "/Dashboard" ? "active" : ""}
        >
          &nbsp; <BiSolidDashboard />
          &nbsp; Dashboard
        </a>
        <a
          href="/Caregivers"
          className={location.pathname === "/Caregivers" ? "active" : ""}
        >
          &nbsp; <FaUserDoctor />
          &nbsp; Caregivers
        </a>

        <a
          href="/Patients"
          className={location.pathname === "/Patients" ? "active" : ""}
        >
          &nbsp; <MdElderlyWoman />
          &nbsp; Patients
        </a>
        <a
          href="/accounts"
          className={location.pathname === "/accounts" ? "active" : ""}
        >
          &nbsp;
          <IoPerson />
          &nbsp; Owners
        </a>

        <a
          href="/Logs"
          className={location.pathname === "/Logs" ? "active" : ""}
        >
          &nbsp;
          <TbLogs />
          &nbsp; Logs
        </a>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <a href="/" onClick={handleLogout}>
          &nbsp;
          <TbLogout /> Logout
        </a>
      </div>
    </div>
  );
};

export default side;

/** <a
          href="/Tasks"
          className={location.pathname === "/Tasks" ? "active" : ""}
        >
          &nbsp;
          <BiTask />
          &nbsp; Tasks
        </a>
        
        <a
          href="/Logs"
          className={location.pathname === "/Logs" ? "active" : ""}
        >
          &nbsp;
          <TbLogs />
          &nbsp; Logs
        </a>*/
