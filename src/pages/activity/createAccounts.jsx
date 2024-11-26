import React from "react";
import { IoIosAdd } from "react-icons/io";

const createAccounts = () => {
  return (
    <div className="createAcc">
      <h2> Create Profiles </h2>
      <a href="/CreateCaregiverAcc">
        <div className="createcgr">
          <a href="/CreateCaregiverAcc">
            <img src="cgr1.png" className="imgcgr"></img>
            <h2>Caregiver</h2>
            <IoIosAdd className="adcgr" />{" "}
          </a>
        </div>
      </a>
      <a href="/CreateElderProfile">
        <div className="createpat">
          <img src="celder.png" className="imgpat"></img>
          <h2>Patients</h2>
          <a href="/CreateElderProfile">
            <IoIosAdd className="adpat" />{" "}
          </a>
        </div>
      </a>
    </div>
  );
};

export default createAccounts;
