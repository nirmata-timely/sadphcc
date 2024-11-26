import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa";
import { MdElderlyWoman } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const Profiles = () => {
  return (
    <div>
      <div className="profile">
        <h2>Profiles</h2>
        <div className="profile1">
          <FaUserDoctor className="imgprof" />
          <p>Caregivers </p>
          <a href="/Caregivers" className="profview">
            <IoIosArrowForward />
          </a>
        </div>
        <div className="profile2">
          <MdElderlyWoman className="imgprof" />
          <p>Patients </p>
          <a href="/Patients" className="profview">
            <IoIosArrowForward />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
