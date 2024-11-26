import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Side from "../dashboard/side";
import Room from "../dashboard/room";

const taskColumns = (handleSelectPatient) => [
  {
    name: "Caregiver",
    selector: (row) => row.cgname,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => (
      <MdKeyboardDoubleArrowRight
        className="assto"
        onClick={() => handleSelectPatient(row.id)}
      />
    ),
    sortable: true,
  },
  {
    name: "Patient Name",
    selector: (row) => row.name,
    sortable: true,
  },
];

const taskData = [
  { id: 1, cgname: "John", name: "Carla" },
  { id: 2, cgname: "Harry", name: "Potter" },
  { id: 3, cgname: "Hermione", name: "Granger" },
  { id: 4, cgname: "Ron", name: "Weasley" },
  { id: 5, cgname: "Draco", name: "Malfoy" },
  { id: 6, cgname: "Luna", name: "Lovegood" },
  { id: 7, cgname: "Neville", name: "Longbottom" },
  { id: 8, cgname: "Ginny", name: "Weasley" },
  { id: 9, cgname: "Sirius", name: "Black" },
  { id: 10, cgname: "Remus", name: "Lupin" },
];

const patientList = [
  "Patient 1",
  "Patient 2",
  "Patient 3",
  "Patient 4",
  "Patient 5", // Add up to 30 patients
];

const customStyles = {
  rows: {
    style: { minHeight: "40px" },
  },
  headCells: {
    style: { paddingLeft: "25px", backgroundColor: "#fcecf1" },
  },
  cells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "40px",
      backgroundColor: "#fcecf1",
    },
  },
};

const PatAdl = () => {
  const [records, setRecords] = useState(taskData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSelectPatient = (id) => {
    setSelectedPatient(id);
    setIsModalOpen(true);
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const newData = taskData.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm) ||
        row.cgname.toLowerCase().includes(searchTerm)
    );
    setRecords(newData);
  };

  const handlePatientChoice = (patient) => {
    const updatedRecords = records.map((row) =>
      row.id === selectedPatient ? { ...row, name: patient } : row
    );
    setRecords(updatedRecords); // Update the state with the new patient data
    setIsModalOpen(false);
  };

  return (
    <div>
      <Side />
      <Room />
      {isModalOpen && (
        <div className="modalassigned">
          <div className="modalassigned-content">
            <h2>Select a Patient</h2>
            <ul>
              {patientList.map((patient, index) => (
                <li key={index} onClick={() => handlePatientChoice(patient)}>
                  {patient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatAdl;
