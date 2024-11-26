import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Side from "./dashboard/side";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import Morning from "./activity/morning";
import Afternoon from "./activity/afternoon";
import Evening from "./activity/evening";

const ViewAdl = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [selectedTime, setSelectedTime] = useState("Morning");
  const [date, setDate] = useState(getCurrentDate());

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected Date: ${date}`);
  };

  return (
    <div>
      <Side />
      <div className="viewpat">
        <a href="/Patients">
          <IoMdArrowRoundBack />
        </a>
        <img src="elder.png" alt="Admin" />
        <h2>Personal Details</h2>

        <h3>Date:</h3>

        {/* New Date Input */}
        <form onSubmit={handleSubmit} className="dateform">
          <input
            className="datepat"
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
          <input type="submit" value="Submit" className="datesubmit" />
        </form>
      </div>

      <div className="personalpat">
        <p>
          <b>Name:</b> &nbsp;&nbsp; John Martin Sarcia <br />
          <br />
          <b>Nickname:</b> &nbsp;&nbsp; Martin <br />
          <br />
          <b>Age:</b>&nbsp;&nbsp; 22 <br />
          <br />
          <b>Birthdate:</b>&nbsp;&nbsp; September 2, 2002
          <br />
          <br />
        </p>
      </div>

      {/* Dropdown for Morning, Afternoon, Evening */}
      <div className="days">
        <label htmlFor="time-select"></label>
        <select
          id="time-select"
          value={selectedTime}
          onChange={handleDropdownChange}
          className="day"
        >
          <option value="Morning">
            <b>Morning</b>
          </option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      {/* Conditionally Render Components */}
      {selectedTime === "Morning" && <Morning />}
      {selectedTime === "Afternoon" && <Afternoon />}
      {selectedTime === "Evening" && <Evening />}
    </div>
  );
};

export default ViewAdl;
