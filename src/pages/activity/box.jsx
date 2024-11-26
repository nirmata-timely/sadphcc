import React, { useState, useEffect } from "react";
import axios from "axios";

const Box = () => {
  const [counts, setCounts] = useState({
    rooms: 0,
    caregivers: 0,
    patients: 0,
    taskslist: 0,
    loggedInCaregivers: 0,
  });

  const [loggedInCaregiverId, setLoggedInCaregiverId] = useState(null);

  const fetchCounts = async () => {
    try {
      const response = await axios.get("http://localhost:5124/api/counts");
      console.log("Received counts:", response.data); // Debug log

      if (response.data) {
        setCounts({
          rooms: response.data.rooms || 0,
          caregivers: response.data.caregivers || 0,
          patients: response.data.patients || 0,
          taskslist: response.data.taskslist || 0,
          loggedInCaregivers: response.data.loggedInCaregivers || 0,
        });
        setLoggedInCaregiverId(response.data.loggedInCaregiverId || null);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 5000);
    return () => clearInterval(interval);
  }, []);

  console.log("Current counts state:", counts);

  return (
    <div className="boxs">
      <a href="/attSummary">
        <div className="onduty">
          <img src="caregiver1.png"></img>
          <h3>{counts.loggedInCaregivers}</h3>
          <h2>On Duty</h2>
        </div>
      </a>

      <a href="/room">
        <div className="roomcount">
          <img src="bed.png" alt="Rooms" />
          <h3>{counts.rooms}</h3>
          <h2>Rooms</h2>
        </div>
      </a>

      <a href="/Caregivers">
        <div className="totalcgr">
          <img src="cgr1.png" alt="Caregivers" />
          <h3>{counts.caregivers}</h3>
          <h2>Caregivers</h2>
        </div>
      </a>

      <a href="/Patients">
        <div className="pats">
          <img src="patient.png" alt="Patients" />
          <h3>{counts.patients}</h3>
          <h2>Patients</h2>
        </div>
      </a>

      <a href="/taskslist">
        <div className="taskassign">
          <img src="task.png"></img>
          <h3>{counts.taskslist}</h3>
          <h2>Tasks</h2>
        </div>
      </a>
    </div>
  );
};

export default Box;
