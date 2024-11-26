// src/pages/dashboard/room.jsx
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Side from "./side";
import axios from "axios";

const roomColumns = [
  {
    name: "Room #",
    selector: (row) => row.room_number, // Access the room number
    sortable: true,
    width: "25%",
  },
  {
    name: "Caregivers",
    cell: (row) => (
      <div>
        {row.caregivers.length > 0
          ? row.caregivers.map((caregiver) => (
              <div
                key={caregiver.id}
              >{`${caregiver.firstname} ${caregiver.lastname}`}</div>
            ))
          : "No caregiver assigned"}
      </div>
    ),
    width: "35%",
  },
  {
    name: "Patients",
    cell: (row) => {
      const uniquePatients = Array.from(
        new Set(row.patients.map((patient) => patient.id))
      ).map((id) => row.patients.find((patient) => patient.id === id));

      return (
        <div>
          {uniquePatients.map((patient) => (
            <div
              key={patient.id}
            >{`${patient.first_name} ${patient.last_name}`}</div>
          ))}
        </div>
      );
    },
    width: "40%",
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
      backgroundColor: "#f7f3ff",
    },
  },
  headCells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "8px",
      backgroundColor: "#f7f3ff",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "40px",
    },
  },
};

const Room = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCaregiverData();
  }, []);

  const fetchCaregiverData = async () => {
    try {
      setLoading(true);
      // Fetch patients and caregivers data
      const [patientsRes, caregiversRes] = await Promise.all([
        axios.get("http://localhost:5124/api/patients"),
        axios.get("http://localhost:5124/api/caregivers"),
      ]);

      // Log the responses to check the data
      console.log("Patients Response:", patientsRes.data);
      console.log("Caregivers Response:", caregiversRes.data);

      // Process and combine the data
      const recordsWithAssignments = caregiversRes.data.reduce(
        (acc, caregiver) => {
          const assignedPatients = patientsRes.data.filter(
            (patient) => patient.room_no === caregiver.room
          );

          // Check if the room already exists in the accumulator
          const existingRoom = acc.find(
            (record) => record.room_number === caregiver.room
          );
          if (existingRoom) {
            // If it exists, push the caregiver to the existing room's caregivers array
            existingRoom.caregivers.push(caregiver);
            existingRoom.patients.push(...assignedPatients); // Combine patients
          } else {
            // If it doesn't exist, create a new record
            acc.push({
              caregiver: caregiver,
              patients: assignedPatients,
              room_number: caregiver.room,
              caregivers: [caregiver], // Initialize caregivers array
            });
          }

          return acc;
        },
        []
      );

      setRecords(recordsWithAssignments);
      setFilteredRecords(recordsWithAssignments);
      setError(null);
    } catch (err) {
      console.error("Error fetching caregiver data:", err);
      setError("Failed to load caregiver data");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = records.filter((row) => {
      const patientsMatch = row.patients?.some((patient) =>
        `${patient.first_name} ${patient.last_name}`
          .toLowerCase()
          .includes(searchTerm)
      );
      const caregiversMatch =
        `${row.caregiver.firstname} ${row.caregiver.lastname}`
          .toLowerCase()
          .includes(searchTerm);
      const roomMatch = row.room_number?.toString().includes(searchTerm); // Check room number

      return patientsMatch || caregiversMatch || roomMatch;
    });
    setFilteredRecords(filteredData);
  };

  return (
    <div>
      <Side />
      <div className="room">
        <h2>Caregivers and Patients</h2>
        <input
          type="text"
          placeholder="Search ..."
          onChange={handleFilter}
          className="searchroom"
        />

        <DataTable
          customStyles={customStyles}
          columns={roomColumns}
          data={filteredRecords}
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
};

export default Room;
