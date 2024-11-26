import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { MdElderlyWoman } from "react-icons/md";
import { FaBed } from "react-icons/fa";

const courses = [
  {
    title: "On Duty Caregivers",
    number: "12",
    icon: <FaUserDoctor />,
  },
  {
    title: "Caregivers",
    icon: <FaUserDoctor />,
  },
  {
    title: "Elderly",
    icon: <MdElderlyWoman />,
  },
  {
    title: "Bedrooms",
    icon: <FaBed />,
  },
];

const card = () => {
  return (
    <div className="card--container">
      {courses.map((item) => (
        <div className="card">
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h3>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;{item.number}
            </h3>
            <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default card;
