import React, { useState, useEffect } from "react";
import Side from "./dashboard/side";
import Upnav from "./dashboard/upnav";
import DataTable from "react-data-table-component";
import { IoPersonAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PieChart } from "@mui/x-charts/PieChart";

const Modal = ({ isOpen, onClose, patients }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    preferred_name: "",
    date_of_birth: "",
    surgery_name: "",
    date_of_surgery: "",
    surgical_outcome: "",
    chronic_illnesses: "",
    allergies: "",
    medication_name: "",
    medication_dosage: "",
    medication_frequency: "",
    ec_first_name: "",
    ec_middle_name: "",
    ec_last_name: "",
    ec_relationship: "",
    ec_contact_number: "",
    ec_email: "",
    ec_street: "",
    ec_city: "",
    ec_province: "",
    ec_zip_code: "",
    country: "",
  });

  if (!isOpen || !patients) return null;

  const handleEditClick = () => {
    setEditedData({
      first_name: patients.first_name,
      middle_name: patients.middle_name,
      last_name: patients.last_name,
      preferred_name: patients.preferred_name,
      date_of_birth: patients.date_of_birth,
      surgery_name: patients.surgery_name,
      date_of_surgery: patients.date_of_surgery,
      surgical_outcome: patients.surgical_outcome,
      chronic_illnesses: patients.chronic_illnesses,
      allergies: patients.allergies,
      medication_name: patients.medication_name,
      medication_dosage: patients.medication_dosage,
      medication_frequency: patients.medication_frequency,
      ec_first_name: patients.ec_first_name,
      ec_middle_name: patients.ec_middle_name,
      ec_last_name: patients.ec_last_name,
      ec_relationship: patients.ec_relationship,
      ec_contact_number: patients.ec_contact_number,
      ec_email: patients.ec_email,
      ec_street: patients.ec_street,
      ec_city: patients.ec_city,
      ec_province: patients.ec_province,
      ec_zip_code: patients.ec_zip_code,
      country: patients.country,
    });
    setIsEditing(true);
  };

  const handleClosePopup = () => setIsEditing(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5124/api/patients/${patients.id}`,
        editedData
      );

      if (response.data.success) {
        alert("Patient details updated successfully!");

        // Log the update activity with patient's full name
        const username = localStorage.getItem("username");
        const patientFullName = `${
          editedData.first_name
        } ${editedData.middle_name.charAt(0)}. ${editedData.last_name}`;

        const logData = {
          username: username,
          activityType: `Updated patient details`,
          timestamp: new Date().toISOString(),
        };

        await axios.post("http://localhost:5124/api/logs", logData);

        handleClosePopup();
        window.location.reload();
      } else {
        alert(response.data.message || "Failed to update patient details");
      }
    } catch (error) {
      console.error("Error updating patient details:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update patient details. Please try again."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <div className="">
        {/* Back Button and Header */}
        <div className={`viewpats ${isEditing ? "blurred" : ""}`}>
          <a href="/Patients">
            <IoMdArrowRoundBack />
          </a>
          <img src="patient1.png" alt="Patient" />
          <h2>Patient Profiles Details</h2>
          <button onClick={handleEditClick}>
            <FaUserEdit className="editcg" />
          </button>
        </div>

        {/* Account Details */}
        <div className="accountdetails">
          <h6>ID: {patients.id}</h6>
          <p>
            <b>Name:</b> {patients.first_name} &nbsp;{" "}
            {patients.middle_name.charAt(0)}. {patients.last_name} <br />
            <br />
            <b>Nickname:</b> &nbsp;&nbsp; {patients.preferred_name} <br />
            <br />
            <b>Birthdate:</b>{" "}
            {new Date(patients.date_of_birth).toISOString().slice(0, 10)}
            <br />
            <br />
          </p>
        </div>

        <div className="medhistory">
          <h2>Medical History</h2>
          <h4>Surgical History</h4>
          <div className="medetails">
            <p>
              <b>Surgery:</b> &nbsp;&nbsp; {patients.surgery_name}
              <br />
              <br />
              <b>Date of Surgery:</b>&nbsp;&nbsp;{" "}
              {new Date(patients.date_of_surgery).toISOString().slice(0, 10)}
              <br />
              <br />
              <b>Surgical Outcome:</b>&nbsp;&nbsp; {patients.surgical_outcome}
              <br />
              <br />
            </p>
          </div>
        </div>

        <div className="medicalConditions">
          <h2>Medical Conditions</h2>
          <h4>Medications</h4>
          <p>
            <b>Chronic Illnesses:</b> &nbsp;&nbsp;{patients.chronic_illnesses}{" "}
            <br />
            <br />
            <b>Allergies:</b>&nbsp;&nbsp; {patients.allergies}
            <br />
            <br />
          </p>
          <a>
            <b>Name:</b> &nbsp;&nbsp; {patients.medication_name} <br />
            <br />
            <b>Dosage:</b>&nbsp;&nbsp; {patients.medication_dosage} <br />
            <br />
            <b>Frequency:</b>&nbsp;&nbsp; {patients.medication_frequency} <br />
            <br />
          </a>
        </div>

        <div className="patcontacts">
          <h2>Emergency Contact</h2>
          <p>
            <b>Name:</b> &nbsp;&nbsp; {patients.ec_first_name} &nbsp;
            {patients.ec_middle_name.charAt(0)}. {patients.ec_last_name}
            <br />
            <br />
            <b>Relationship:</b>&nbsp;&nbsp; {patients.ec_relationship}
            <br />
            <br />
            <b>Contact No.:</b>&nbsp;&nbsp; {patients.ec_contact_number} <br />
            <br />
            <b>Email:</b>&nbsp;&nbsp; {patients.ec_email} <br />
            <br />
          </p>
          <a>
            <b>Address:</b> &nbsp;&nbsp; {patients.ec_street} &nbsp;
            {patients.ec_city}, {patients.ec_province} {patients.ec_zip_code}{" "}
            {patients.country}
          </a>
        </div>

        {/**edit here */}

        {isEditing && (
          <div className="popupcg">
            <div className="popupcg-content">
              <IoMdCloseCircleOutline
                onClick={handleClosePopup}
                className="editclose"
              />
              <h3>Edit Patient Details</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  <br></br>
                  Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="first_name"
                    value={editedData.first_name}
                    onChange={handleInputChange}
                  />
                </label>
                <br></br>
                <label>
                  Nickname: &nbsp;
                  <input
                    type="text"
                    name="nickname"
                    defaultValue={patients.preferred_name}
                  />
                </label>
                <br></br>
                <label>
                  Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="number" name="age" defaultValue={patients.age} />
                </label>
                <br></br>
                <label>
                  Birthdate:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="date"
                    name="birthdate"
                    defaultValue={patients.date_of_birth}
                  />
                </label>
                <br></br>
                <br></br>
                <h4>Surgical History</h4>
                <label>
                  <br></br>
                  Surgery: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="surgery"
                    defaultValue={patients.surgery_name}
                  />
                </label>
                <br></br>
                <label>
                  Date of Surgery: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="date"
                    name="dateOfSurgery"
                    defaultValue={patients.date_of_surgery}
                  />
                </label>
                <br></br>
                <label>
                  Surgical Outcome: &nbsp;&nbsp;
                  <input
                    type="text"
                    name="surgicalOutcome"
                    defaultValue={patients.surgical_outcome}
                  />
                </label>
                <br></br>
                <br></br>

                <h4>Medications</h4>
                <br></br>
                <label>
                  Chronic Illnesses: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="chronicIllnesses"
                    defaultValue={patients.chronic_illnesses}
                  />
                </label>
                <br></br>
                <label>
                  Allergies: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="allergies"
                    defaultValue={patients.allergies}
                  />
                </label>
                <br></br>
                <label>
                  Medication Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="medicationName"
                    defaultValue={patients.medication_name}
                  />
                </label>
                <br></br>
                <label>
                  Medication Dosage:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="medicationDosage"
                    defaultValue={patients.medication_dosage}
                  />
                </label>
                <br></br>
                <label>
                  Medication Frequency: &nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="medicationFrequency"
                    defaultValue={patients.medication_frequency}
                  />
                </label>
                <br></br>
                <br></br>

                <h4>Emergency Contact</h4>
                <br></br>
                <label>
                  Name:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="emergencyContact.name"
                    defaultValue={
                      patients.ec_first_name +
                      " " +
                      patients.ec_middle_name.charAt(0) +
                      ". " +
                      patients.ec_last_name
                    }
                  />
                </label>
                <br></br>
                <label>
                  Relationship: &nbsp;
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    defaultValue={patients.ec_relationship}
                  />
                </label>
                <br></br>
                <label>
                  Contact No.: &nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="emergencyContact.contactNo"
                    defaultValue={patients.ec_contact_number}
                  />
                </label>
                <br></br>
                <label>
                  Email:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="email"
                    name="emergencyContact.email"
                    defaultValue={patients.ec_email}
                  />
                </label>
                <br></br>
                <label>
                  Address:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="text"
                    name="emergencyContact.address"
                    defaultValue={
                      patients.ec_street +
                      " " +
                      patients.ec_city +
                      ", " +
                      patients.ec_province +
                      " " +
                      patients.ec_zip_code +
                      " " +
                      patients.country
                    }
                  />
                </label>
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ADLModal = ({ isOpen, onClose, patientADL }) => {
  if (!isOpen || !patientADL) return null;

  const [morningrecords, setMorningRecords] = useState([]);
  const [afternoonrecords, setAfternoonRecords] = useState([]);
  const [eveningrecords, setEveningRecords] = useState([]);

  useEffect(() => {
    const fetchMorningData = async () => {
      try {
        console.log("Fetching morning data for patient ID:", patientADL.id);
        const response = await axios.get(
          `http://localhost:5124/api/morning/${patientADL.id}`
        );
        console.log("Fetched records:", response.data);
        setMorningRecords(response.data);
      } catch (error) {
        console.error("Error fetching morning data:", error);
      }
    };

    fetchMorningData();
  }, [patientADL.id]);

  useEffect(() => {
    const fetchAfternoonData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5124/api/afternoon/${patientADL.id}`
        );
        console.log("Fetched records:", response.data); // Check structure here
        setAfternoonRecords(response.data);
      } catch (error) {
        console.error("Error fetching Afternoon data:", error);
      }
    };
    fetchAfternoonData();
  }, [patientADL.id]);

  useEffect(() => {
    const fetchEveningData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5124/api/evening/${patientADL.id}`
        );
        console.log("Fetched records:", response.data);
        setEveningRecords(response.data);
      } catch (error) {
        console.error("Error fetching Evening data:", error);
      }
    };
    fetchEveningData();
  }, [patientADL.id]);

  // morning
  const adlmorning = [
    /*{ name: "Time of Day", selector: (row) => row.time_of_day },
    { name: "Patient", selector: (row) => row.first_name }, // will be removed. for testing purposes muna
    { name: "Caregiver", selector: (row) => row.firstname },*/
    {
      name: "Task",
      selector: (row) => row.task_name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color:
              row.status.trim().toLowerCase() === "completed" ? "green" : "red",
          }}
        >
          {row.status}
        </span>
      ),
    },
    /*{
      name: "Date",
      selector: (row) => {
        const date = new Date(row.task_date);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },*/
    {
      name: "Notes",
      selector: (row) => row.remarks,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
        backgroundColor: "#f7eeff",
      },
    },
    headCells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "8px",
        backgroundColor: "#f7eeff",
      },
    },
    cells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "40px",
        backgroundColor: "#f7eeff",
      },
    },
  };

  //afternoon

  const adlafternoon = [
    /*{ name: "Time of Day", selector: (row) => row.time_of_day },
    { name: "Patient", selector: (row) => row.first_name }, // will be removed. for testing purposes muna
     { name: "Caregiver", selector: (row) => row.caregiver_name },*/

    {
      name: "Task",
      selector: (row) => row.task_name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color:
              row.status.trim().toLowerCase() === "completed" ? "green" : "red",
          }}
        >
          {row.status}
        </span>
      ),
    },
    /*  {
      name: "Date",
      selector: (row) => {
        const date = new Date(row.task_date);
        return date.toLocaleString("en-PH", { timeZone: "Asia/Manila" });
      },
    },*/
    {
      name: "Notes",
      selector: (row) => row.remarks,
    },
  ];

  const afternooncustomStyles = {
    rows: {
      style: {
        minHeight: "40px",
        backgroundColor: "#FCF5DF",
      },
    },
    headCells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "8px",
        backgroundColor: "#FCF5DF",
      },
    },
    cells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "40px",
        backgroundColor: "#FCF5DF",
      },
    },
  };

  // evening
  const adlevening = [
    /*{ name: "Time of Day", selector: (row) => row.time_of_day },
    { name: "Patient", selector: (row) => row.first_name }, // will be removed. for testing purposes muna
    { name: "Caregiver", selector: (row) => row.caregiver_name },*/
    {
      name: "Task",
      selector: (row) => row.task_name,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color:
              row.status.trim().toLowerCase() === "completed" ? "green" : "red",
          }}
        >
          {row.status}
        </span>
      ),
    },
    /*{
      name: "Date",
      selector: (row) => {
        const date = new Date(row.task_date);
        return date.toLocaleString("en-PH", { timeZone: "Asia/Manila" });
      },
    },*/
    {
      name: "Notes",
      selector: (row) => row.remarks,
    },
  ];

  const eveningcustomStyles = {
    rows: {
      style: {
        color: "#ffffff",
        minHeight: "40px",
        backgroundColor: "#192746",
      },
    },
    headCells: {
      style: {
        color: "#ffffff",
        paddingLeft: "25px",
        paddingRight: "8px",
        backgroundColor: "#192746",
      },
    },
    cells: {
      style: {
        color: "#ffffff",
        paddingLeft: "25px",
        paddingRight: "40px",
        backgroundColor: "#192746",
      },
    },
  };

  return (
    <div className={`viewpat ${isOpen ? "" : ""}`}>
      <div className="patdetails">
        <p>
          {" "}
          Patient: {patientADL.first_name}
          <br />
          Room: {patientADL.room_no}
          <br />
          Assigned Caregivers: {patientADL.caregivers.join(", ")}
        </p>
      </div>

      <button onClick={onClose} className="closeadl">
        <IoMdArrowRoundBack />
      </button>

      <a href="/patAdl">View Patients ADL</a>

      {/* morning */}

      <div className="morning">
        <h6>Morning Activities</h6>
        <DataTable
          className="adlmorning"
          customStyles={customStyles}
          columns={adlmorning}
          data={morningrecords}
          fixedHeader
        ></DataTable>
      </div>

      <div className="afternoon">
        <h6>Afternoon Activities</h6>
        <DataTable
          className="adlafternoon"
          customStyles={afternooncustomStyles}
          columns={adlafternoon}
          data={afternoonrecords}
          fixedHeader
          pagination
        ></DataTable>
      </div>

      {/* evening */}
      <div className="evening">
        <h6>Evening Activities</h6>
        <DataTable
          customStyles={eveningcustomStyles}
          columns={adlevening}
          data={eveningrecords}
          fixedHeader
          pagination
          paginationPerPage={5}
        ></DataTable>
      </div>

      <div className="empty"></div>
    </div>
  );
};

const SummaryReportModal = ({ isOpen, onClose, patient }) => {
  if (!isOpen || !patient) return null;

  const [summaryRecords, setSummaryRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  console.log("Patient Object in SummaryReportModal:", patient);

  const summaryReportColumns = [
    /* {
      name: "Caregiver",
      selector: (row) => row.firstname,
      sortable: true,
    },*/
    { name: "Patient", selector: (row) => row.first_name, sortable: true },
    {
      name: "Task",
      selector: (row) => row.task_name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color:
              row.status.trim().toLowerCase() === "completed" ? "green" : "red",
          }}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        const date = new Date(row.task_date);
        return date.toLocaleDateString("en-PH", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
      sortable: true,
    },
    {
      name: "Day",
      selector: (row) => row.time_of_day,
      sortable: true,
      cell: (row) => (
        <span
          style={{
            color:
              row.time_of_day === "morning"
                ? "#ffbd59"
                : row.time_of_day === "afternoon"
                ? "#ff914d"
                : "#192746",
            fontWeight: "bold",
          }}
        >
          {row.time_of_day}
        </span>
      ),
    },
  ];

  const reportcustomStyles = {
    rows: {
      style: {
        minHeight: "40px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "40px",
      },
    },
  };

  useEffect(() => {
    const fetchPatAdlData = async () => {
      if (!patient) return;
      try {
        const response = await axios.get(
          `http://localhost:5124/api/patadl/${patient.id}`
        );
        console.log("Fetched records:", response.data);
        setSummaryRecords(response.data);
        setFilteredRecords(response.data);

        const latestDate = response.data.reduce((latest, summaryRecords) => {
          return new Date(summaryRecords.task_date) > new Date(latest)
            ? summaryRecords.task_date
            : latest;
        }, "");
        setSelectedDate(latestDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatAdlData();
  }, [patient]);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();

    const newData = summaryRecords.filter((row) => {
      return (
        row.firstname?.toLowerCase().includes(searchTerm) ||
        row.task_name?.toLowerCase().includes(searchTerm) ||
        row.status?.toLowerCase().includes(searchTerm) ||
        row.remarks?.toLowerCase().includes(searchTerm) ||
        row.time_of_day?.toLowerCase().includes(searchTerm) ||
        row.task_date?.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredRecords(newData);
  }

  return (
    <div className="">
      <div className={`report ${isOpen ? "" : ""}`}>
        <h3>Summary Report</h3>
        <p>
          Patient: &nbsp;{patient.first_name} {patient.middle_name.charAt(0)}.{" "}
          {patient.last_name}
        </p>

        {/** 
        <form className="dateform">
          <label className="datepattext">Date:</label>
          <input
            className="datepat"
            type="date"
            id="date"
            name="date"
            value={selectedDate || today}
            onChange={handleDateChange}
          />
          <button onClick={handleSubmit} type="submit" className="datesubmit">
            Submit
          </button>
        </form>*/}

        <input
          type="text"
          placeholder="Search...                           🔍"
          onChange={handleFilter}
          className="searchpatadl"
        />

        <div className="patadl">
          <h2> Activity of Daily Living</h2>
          <DataTable
            customStyles={reportcustomStyles}
            columns={summaryReportColumns}
            data={filteredRecords}
            fixedHeader
            pagination
          ></DataTable>
        </div>

        <button onClick={onClose} className="closeadlreport">
          <IoMdArrowRoundBack />
        </button>

        <div className="empty"></div>
      </div>
    </div>
  );
};

const Patients = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState(null);
  const [adlModalOpen, setAdlModalOpen] = useState(false);
  const [selectedADL, setSelectedADL] = useState(null);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);
  const [selectedSummaryPatient, setSelectedSummaryPatient] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5124/api/patients")
      .then((response) => {
        setAllRecords(response.data);
        setRecords(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleViewClick = (row) => {
    console.log("Selected patient for profile:", row);
    setSelectedPatients(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPatients(null);
  };

  const handleViewADLClick = (row) => {
    console.log("Selected patient for ADL:", row);
    setSelectedADL(row);
    setAdlModalOpen(true);
  };

  const closeAdlModal = () => {
    setAdlModalOpen(false);
    setSelectedADL(null);
  };

  const handleViewSummaryClick = (row) => {
    setSelectedSummaryPatient(row);
    setSummaryModalOpen(true);
  };

  const groupedRecords = records.reduce((acc, row) => {
    const key = `${row.first_name} ${row.middle_name.charAt(0)}. ${
      row.last_name
    }`;
    if (!acc[key]) {
      acc[key] = { ...row, caregivers: [] };
    }
    acc[key].caregivers.push(row.firstname);
    return acc;
  }, {});

  const groupedData = Object.values(groupedRecords);

  const patColumns = [
    {
      name: "Name",
      selector: (row) =>
        `${row.first_name} ${row.middle_name.charAt(0)}. ${row.last_name}`,
      sortable: true,
      width: "200px",
    },
    {
      name: "Nickname",
      selector: (row) => `${row.preferred_name}`,
      sortable: true,
      width: "150px",
    },
    {
      name: "Assigned Caregivers",
      cell: (row) => (
        <div>
          {row.caregivers.map((caregiver, index) => (
            <div key={index}>{caregiver}</div>
          ))}
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Room",
      selector: (row) => `${row.room_no}`,
      sortable: true,
      width: "130px",
    },

    {
      name: "ADL",
      cell: (row) => (
        <button className="viewadl" onClick={() => handleViewADLClick(row)}>
          View ADL
        </button>
      ),
      width: "130px",
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="viewadl" onClick={() => handleViewClick(row)}>
          View Profile
        </button>
      ),
      width: "150px",
    },
    {
      name: "Summary Report",
      cell: (row) => (
        <button className="viewadl" onClick={() => handleViewSummaryClick(row)}>
          View
        </button>
      ),
      width: "200px",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        position: "sticky",
      },
    },
    rows: {
      style: {
        minHeight: "40px",
        backgroundColor: "#FCF5DF",
      },
    },
    headCells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "8px",
        backgroundColor: "#FCF5DF",
      },
    },
    cells: {
      style: {
        paddingLeft: "25px",
        paddingRight: "40px",
      },
    },
  };

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setRecords(allRecords);
    } else {
      const filteredData = allRecords.filter(
        (row) =>
          row.firstname.toLowerCase().includes(searchTerm) ||
          row.middlename.toLowerCase().includes(searchTerm) ||
          row.lastname.toLowerCase().includes(searchTerm) ||
          row.preferred_name.toLowerCase().includes(searchTerm)
      );
      setRecords(filteredData);
    }
  }

  function handleRowSelected(state) {
    setSelectedRows(state.selectedRows);
  }

  function handleDeleteSelected() {
    if (selectedRows.length > 0) {
      const selectedIds = selectedRows.map((row) => row.id);
      axios
        .delete("http://localhost:5124/api/patients", {
          headers: { "Content-Type": "application/json" },
          data: { ids: selectedIds },
        })
        .then(() => {
          const remainingRecords = allRecords.filter(
            (record) => !selectedIds.includes(record.id)
          );
          setAllRecords(remainingRecords);
          setRecords(remainingRecords);
          setSelectedRows([]);
        })
        .catch((error) => console.error("Error deleting data:", error));
    } else {
      alert("No profile selected!");
    }
  }

  return (
    <div>
      <Side />
      <Upnav />
      <div className={`${modalOpen || adlModalOpen ? "blurry" : ""}`}>
        <div className="acon">
          <FaUserDoctor className="img" />
          <p className="dash">Patients</p>
        </div>
        <input
          type="text"
          placeholder="Search...                           🔍"
          onChange={handleFilter}
          className="searchcgr"
        />

        <a href="/CreateElderProfile">
          <button className="addcgrs">
            <IoPersonAdd />
          </button>
        </a>

        <button onClick={handleDeleteSelected}>
          <MdDelete className="deletecgr" />
        </button>

        <div className="cgrAssign">
          <DataTable
            customStyles={customStyles}
            columns={patColumns}
            data={groupedData}
            fixedHeader
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            pagination
          />
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        patients={selectedPatients}
      />

      <ADLModal
        isOpen={adlModalOpen}
        onClose={closeAdlModal}
        patientADL={selectedADL}
      />

      <SummaryReportModal
        isOpen={summaryModalOpen}
        onClose={() => setSummaryModalOpen(false)}
        patient={selectedSummaryPatient}
      />
    </div>
  );
};

export default Patients;

/**<h3>Date:</h3>

          {/* New Date Input 
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
          </form> */
