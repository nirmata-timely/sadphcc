import React, { useState, useEffect } from "react";
import Side from "./dashboard/side";
import Upnav from "./dashboard/upnav";
import DataTable from "react-data-table-component";
import { IoPersonAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye, FaUserEdit } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({ isOpen, onClose, caregiver }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    cgauser: "",
    cgapass: "",
    firstname: "",
    middlename: "",
    lastname: "",
    birth: "",
    gender: "",
    age: "",
    contact: "",
    email: "",
    street: "",
    exp: "",
    availability: "",
    workhours: "",
    cpr: "",
    ecfirst: "",
    ecmiddle: "",
    eclast: "",
    ecrel: "",
    ecnum: "",
    ecemail: "",
    ecst: "",
    room: "",
  });

  if (!isOpen || !caregiver) return null;

  const togglePassword = () => setShowPassword(!showPassword);
  const handleEditClick = () => {
    setEditedData({
      cgauser: caregiver.cgauser,
      cgapass: caregiver.cgapass,
      firstname: caregiver.firstname,
      middlename: caregiver.middlename,
      lastname: caregiver.lastname,
      birth: caregiver.birth,
      gender: caregiver.gender,
      age: caregiver.age,
      contact: caregiver.contact,
      email: caregiver.email,
      street: caregiver.street,
      exp: caregiver.exp,
      availability: caregiver.availability,
      workhours: caregiver.workhours,
      cpr: caregiver.cpr,
      ecfirst: caregiver.ecfirst,
      ecmiddle: caregiver.ecmiddle,
      eclast: caregiver.eclast,
      ecrel: caregiver.ecrel,
      ecnum: caregiver.ecnum,
      ecemail: caregiver.ecemail,
      ecst: caregiver.ecst,
      room: caregiver.room,
    });
    setIsEditing(true);
  };

  const handleClosePopup = () => setIsEditing(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5124/api/caregivers/${caregiver.id}`,
        editedData
      );

      if (response.data.success) {
        alert("Caregiver details updated successfully!");

        const username = localStorage.getItem("username");
        const logData = {
          username: username,
          activityType: "Updated caregiver details",
          timestamp: new Date().toISOString(),
        };

        await axios.post("http://localhost:5124/api/logs", logData);

        handleClosePopup();
        window.location.reload();
      } else {
        alert(response.data.message || "Failed to update caregiver details");
      }
    } catch (error) {
      console.error("Error updating caregiver details:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update caregiver details. Please try again."
      );
    }
  };

  return (
    <div className="">
      <div className="">
        <div className={`viewcg ${isEditing ? "blurred" : ""}`}>
          <a href="/Caregivers">
            <IoMdArrowRoundBack />
          </a>
          <img src="adminriza.png" alt="Caregiver" />
          <h2>Account Details</h2>
          <button onClick={handleEditClick}>
            <FaUserEdit className="editcg" />
          </button>
        </div>

        <div className="accountdetails">
          <h3>ID: {caregiver.id}</h3>
          <p>
            <b>Username:</b> {caregiver.cgauser}
            <br />
            <br />
            <b>Password:</b> {showPassword ? caregiver.cgapass : "*****"}
            <button className="showpass" onClick={togglePassword}>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
            <br />
            <br />
            <b>Room No:</b> {caregiver.room}
          </p>
        </div>

        <div className="personal">
          <h2>Personal Details</h2>
          <p>
            <b>Name:</b> {caregiver.firstname}
            <br />
            <br />
            <b>Birthdate:</b>{" "}
            {new Date(caregiver.birth).toISOString().slice(0, 10)}
            <br />
            <br />
            <b>Gender:</b> {caregiver.gender}
            <br />
            <br />
            <b>Age:</b> {caregiver.age}
            <br />
            <br />
          </p>
          <a>
            <b>Contact No.:</b> {caregiver.contact}
            <br />
            <br />
            <b>Email:</b> {caregiver.email}
            <br />
            <br />
            <b>Address:</b> {caregiver.street}
          </a>
        </div>

        <div className="employment">
          <h2>Employment Details</h2>
          <p>
            <b>Years of Experience:</b> {caregiver.exp}
            <br />
            <br />
            <b>Availability:</b> {caregiver.availability}
            <br />
            <br />
            <b>Preferred Work Hours:</b> {caregiver.workhours}
            <br />
          </p>
          <a>
            <b>CPR Certification:</b> {caregiver.cpr}
          </a>
        </div>

        <div className="contacts">
          <h2>Emergency Contact</h2>
          <p>
            <b>Name:&nbsp;</b> {caregiver.ecfirst}{" "}
            {caregiver.ecmiddle.charAt(0)}. {caregiver.eclast}
            <br />
            <br />
            <b>Relationship:</b> {caregiver.ecrel}
            <br />
            <br />
            <b>Contact No.:</b> {caregiver.ecnum}
            <br />
            <br />
          </p>
          <a>
            <b>Email:</b> {caregiver.ecemail}
            <br /> <br />
            <b>Address:</b> {caregiver.ecst}
          </a>
        </div>

        {isEditing && (
          <div className="popupcg">
            <div className="popupcg-content">
              <IoMdCloseCircleOutline
                onClick={handleClosePopup}
                className="editclose"
              />
              <h3>Edit Caregiver Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <h4>Account Details</h4>
                  <label>
                    Username:&nbsp;
                    <input
                      type="text"
                      name="cgauser"
                      value={editedData.cgauser}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Password:&nbsp;
                    <input
                      type="text"
                      name="cgapass"
                      value={editedData.cgapass}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                </div>

                <div className="form-section">
                  <h4>Personal Details</h4>
                  <label>
                    First Name:&nbsp;
                    <input
                      type="text"
                      name="firstname"
                      value={editedData.firstname}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Middle Name:&nbsp;
                    <input
                      type="text"
                      name="middlename"
                      value={editedData.middlename}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Last Name:&nbsp;
                    <input
                      type="text"
                      name="lastname"
                      value={editedData.lastname}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Birthdate:&nbsp;
                    <input
                      type="date"
                      name="birth"
                      value={editedData.birth}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Gender:&nbsp;
                    <input
                      type="text"
                      name="gender"
                      value={editedData.gender}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Age:&nbsp;
                    <input
                      type="number"
                      name="age"
                      value={editedData.age}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Contact:&nbsp;
                    <input
                      type="text"
                      name="contact"
                      value={editedData.contact}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Email:&nbsp;
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Address:&nbsp;
                    <input
                      type="text"
                      name="street"
                      value={editedData.street}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                </div>

                <div className="form-section">
                  <h4>Employment Details</h4>
                  <label>
                    Years of Experience:&nbsp;
                    <input
                      type="number"
                      name="exp"
                      value={editedData.exp}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Availability:&nbsp;
                    <input
                      type="text"
                      name="availability"
                      value={editedData.availability}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Work Hours:&nbsp;
                    <input
                      type="text"
                      name="workhours"
                      value={editedData.workhours}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    CPR Certification:&nbsp;
                    <input
                      type="text"
                      name="cpr"
                      value={editedData.cpr}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                </div>

                <div className="form-section">
                  <h4>Emergency Contact</h4>
                  <label>
                    First Name:&nbsp;
                    <input
                      type="text"
                      name="ecfirst"
                      value={editedData.ecfirst}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Middle Name:&nbsp;
                    <input
                      type="text"
                      name="ecmiddle"
                      value={editedData.ecmiddle}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Last Name:&nbsp;
                    <input
                      type="text"
                      name="eclast"
                      value={editedData.eclast}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Relationship:&nbsp;
                    <input
                      type="text"
                      name="ecrel"
                      value={editedData.ecrel}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Contact Number:&nbsp;
                    <input
                      type="text"
                      name="ecnum"
                      value={editedData.ecnum}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Email:&nbsp;
                    <input
                      type="email"
                      name="ecemail"
                      value={editedData.ecemail}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Address:&nbsp;
                    <input
                      type="text"
                      name="ecst"
                      value={editedData.ecst}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                </div>

                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AccomplishmentsModal = ({ isOpen, onClose, caregiver }) => {
  if (!isOpen) return null;

  const [data, setData] = useState([]);

  const accColumns = [
    {
      name: "Patient",
      selector: (row) => row.first_name,
      sortable: true,
    },
    { name: "Day", selector: (row) => row.time_of_day, sortable: true },

    { name: "Total Tasks", selector: (row) => row.total_tasks, sortable: true },
    {
      name: "Completed Tasks",
      selector: (row) => row.completed_tasks,
      sortable: true,
    },
    {
      name: "Pending Tasks",
      selector: (row) => row.pending_tasks,
      sortable: true,
    },
    {
      name: "Completion %",
      selector: (row) => row.completed_percentage,
      sortable: true,
    },
    {
      name: "Pending %",
      selector: (row) => row.pending_percentage,
      sortable: true,
    },
  ];

  const accCustomStyles = {
    headRow: { style: { position: "sticky" } },
    rows: { style: { minHeight: "40px", backgroundColor: "#EBEEF6" } },
    headCells: {
      style: {
        paddingLeft: "55px",
        paddingRight: "8px",
        backgroundColor: "#EBEEF6",
      },
    },
    cells: { style: { paddingLeft: "55px", paddingRight: "40px" } },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (caregiver) {
        try {
          const res = await axios.get(
            `http://localhost:5124/api/caregiverscompletion/${caregiver.id}`
          );
          console.log("Accomplishments data:", res.data);
          setData(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [caregiver]);

  return (
    <div className="accomplishments">
      <h3>Accomplishments for </h3>
      <p>
        {" "}
        Caregiver: &nbsp; <b>{caregiver.firstname}</b>
      </p>

      <button onClick={onClose} className="closeadl">
        <IoMdArrowRoundBack />
      </button>

      <div className="caregiverscompletion">
        <h1>Caregivers Tasks Completion</h1>
        <DataTable
          className=""
          columns={accColumns}
          customStyles={accCustomStyles}
          data={data}
        />
      </div>
    </div>
  );
};

const Caregivers = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [accomplishmentsModalOpen, setAccomplishmentsModalOpen] =
    useState(false);
  const [selectedAccomplishments, setSelectedAccomplishments] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5124/api/caregivers")
      .then((response) => {
        setAllRecords(response.data);
        setRecords(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleViewClick = (row) => {
    setSelectedCaregiver(row);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCaregiver(null);
  };

  const handleAccomplishmentsClick = (row) => {
    setSelectedAccomplishments(row);
    setAccomplishmentsModalOpen(true);
  };

  const closeAccomplishmentsModal = () => {
    setAccomplishmentsModalOpen(false);
    setSelectedAccomplishments(null);
  };

  const cgrColumns = [
    {
      name: "Name",
      selector: (row) =>
        `${row.firstname} ${row.middlename.charAt(0)}. ${row.lastname}`,
      sortable: true,
      width: "250px",
    },
    {
      name: "Username",
      selector: (row) => row.cgauser,
      sortable: true,
    },
    {
      name: "Room Assigned",
      selector: (row) => `${row.room}`,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="viewprof" onClick={() => handleViewClick(row)}>
          View Profile
        </button>
      ),
    },
    {
      name: "Accomplishments",
      cell: (row) => (
        <button
          className="viewprof"
          onClick={() => handleAccomplishmentsClick(row)}
        >
          View
        </button>
      ),
    },
  ];

  const customStyles = {
    headRow: { style: { position: "sticky" } },
    rows: { style: { minHeight: "40px", backgroundColor: "#EBEEF6" } },
    headCells: {
      style: {
        paddingLeft: "55px",
        paddingRight: "8px",
        backgroundColor: "#EBEEF6",
      },
    },
    cells: { style: { paddingLeft: "55px", paddingRight: "40px" } },
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
          row.cgauser.toLowerCase().includes(searchTerm)
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
        .delete("http://localhost:5124/api/caregivers", {
          headers: { "Content-Type": "application/json" },
          data: { ids: selectedIds },
        })
        .then(async () => {
          const remainingRecords = allRecords.filter(
            (record) => !selectedIds.includes(record.id)
          );
          setAllRecords(remainingRecords);
          setRecords(remainingRecords);
          setSelectedRows([]);

          const username = localStorage.getItem("username");
          const logData = {
            username: username,
            activityType: "Deleted caregiver/s",
            timestamp: new Date().toISOString(),
            deletedIds: selectedIds,
          };

          await axios.post("http://localhost:5124/api/logs", logData);
        })
        .catch((error) => console.error("Error deleting data:", error));
    } else {
      alert("No caregivers selected!");
    }
  }

  return (
    <div>
      <Side />
      <Upnav />
      <div className={`${modalOpen ? "blurry" : ""}`}>
        <div className="acon">
          <FaUserDoctor className="img" />
          <p className="dash">Caregiver</p>
        </div>
        <input
          type="text"
          placeholder="Search...                           🔍"
          onChange={handleFilter}
          className="searchcgr"
        />

        <a href="/CreateCaregiverAcc">
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
            columns={cgrColumns}
            data={records}
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
        caregiver={selectedCaregiver}
      />

      <AccomplishmentsModal
        isOpen={accomplishmentsModalOpen}
        onClose={closeAccomplishmentsModal}
        caregiver={selectedAccomplishments}
      />
    </div>
  );
};

export default Caregivers;
