import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { IoIosAddCircleOutline } from "react-icons/io";
import Side from "../dashboard/side";
import Addtasks from "./addtasks";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Modal = ({ isOpen, onClose }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskHour, setTaskHour] = useState("");
  const [taskMinute, setTaskMinute] = useState("");
  const [taskPeriod, setTaskPeriod] = useState("AM");

  if (!isOpen) return null;

  const handleSaveTask = () => {
    const newTask = {
      task_name: taskTitle,
      description: taskDesc,
      sched_time: `${taskHour}:${taskMinute} ${taskPeriod}`,
    };
    // Add newTask to tasks list (send to API or update the state in TasksList)
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className="popup-overlay">
          <Addtasks trigger={isOpen} setTrigger={onClose}>
            <div className="popupbox">
              <h3>Add New Task</h3>
              <div className="taskTitle">
                <h3>Title</h3>
                <input
                  className="title"
                  type="text"
                  placeholder="Task title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
              </div>
              <div className="taskDesc">
                <h3>Description</h3>
                <input
                  type="text"
                  placeholder="Description"
                  className="desc"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                />
              </div>
              <div className="taskTime">
                <h3>Scheduled Time</h3>
                <div className="time">
                  <select
                    className="time-hours"
                    value={taskHour}
                    onChange={(e) => setTaskHour(e.target.value)}
                  >
                    {[...Array(12).keys()].map((hour) => (
                      <option key={hour} value={hour + 1}>
                        {hour + 1}
                      </option>
                    ))}
                  </select>
                  <span>:</span>
                  <select
                    className="time-minutes"
                    value={taskMinute}
                    onChange={(e) => setTaskMinute(e.target.value)}
                  >
                    {[...Array(60).keys()].map((minute) => (
                      <option
                        key={minute}
                        value={minute < 10 ? `0${minute}` : minute}
                      >
                        {minute < 10 ? `0${minute}` : minute}
                      </option>
                    ))}
                  </select>
                  <select
                    className="time-ampm"
                    value={taskPeriod}
                    onChange={(e) => setTaskPeriod(e.target.value)}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
              <button className="saveTask" onClick={handleSaveTask}>
                Save
              </button>
            </div>
          </Addtasks>
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const TasksList = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:2231/api/tasklist")
      .then((response) => {
        setAllRecords(response.data);
        setRecords(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const tasklistColumns = [
    {
      name: "Task",
      selector: (row) => `${row.task_name}`,
    },
    {
      name: "Description",
      selector: (row) => `${row.description}`,
    },
    {
      name: "Scheduled Time",
      selector: (row) => `${row.sched_time}`,
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
        backgroundColor: "#e4f8ed",
      },
    },
    headCells: {
      style: {
        paddingLeft: "15px",
        paddingRight: "2px",
        backgroundColor: "#e4f8ed",
      },
    },
    cells: {
      style: {
        paddingLeft: "10px",
        paddingRight: "0px",
        backgroundColor: "#e4f8ed",
      },
    },
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = searchTerm
      ? allRecords.filter(
          (row) =>
            row.task_name.toLowerCase().includes(searchTerm) ||
            row.description.toLowerCase().includes(searchTerm)
        )
      : allRecords;
    setRecords(filteredData);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length > 0) {
      const selectedIds = selectedRows.map((row) => row.id);
      const remainingTasks = records.filter(
        (record) => !selectedIds.includes(record.id)
      );
      setRecords(remainingTasks);
      setSelectedRows([]);
    } else {
      alert("No tasks selected!");
    }
  };

  return (
    <div className="taskslist">
      <Side />
      <h2>Task List</h2>
      <input
        type="text"
        placeholder="Search... 🔍"
        onChange={handleFilter}
        className="searchtasks"
      />
      <button onClick={() => setIsPopupVisible(true)} className="addtasks-btn">
        <IoIosAddCircleOutline className="addtasks" />
      </button>
      <button onClick={handleDeleteSelected} className="deletetasks-btn">
        <MdDelete className="deletetasks" />
      </button>
      <div
        className={`taskslist1 ${isPopupVisible ? "blurred-background" : ""}`}
      >
        <DataTable
          customStyles={customStyles}
          columns={tasklistColumns}
          data={records}
          fixedHeader
          selectableRows
          onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
        />
      </div>
      <Modal isOpen={isPopupVisible} onClose={() => setIsPopupVisible(false)} />
    </div>
  );
};

export default TasksList;



import { useState, useEffect } from "react";
import Side from "./dashboard/side";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye, FaUserEdit } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom"; // Import useParams

const ViewCg = () => {
  const { id } = useParams();
  const [caregivers, setCaregiver] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3309/api/caregivers");
        const data = await response.json();
        setCaregiver(data[0]); //when change the inputs corresponds to the id
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateCaregiver = async (updatedCaregiver) => {
    try {
      const response = await fetch(
        `http://localhost:3309/api/caregivers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCaregiver),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setCaregiver(updatedData); // Update state with new data
        handleClosePopup(); // Close the edit popup
      } else {
        console.error("Failed to update caregiver");
      }
    } catch (error) {
      console.error("Error updating caregiver:", error);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCaregiver = {
      cgauser: e.target.elements.cgauser.value,
    };
    handleUpdateCaregiver(updatedCaregiver);
    console.log("Form submitted.");
    handleClosePopup();
  };

  return (
    <div>
      <Side />

      <div className={`viewcg ${isEditing ? "blurred" : ""}`}>
        <a href="/Caregivers">
          <IoMdArrowRoundBack />
        </a>
        <img src="adminriza.png" />
        <h2>Account Details</h2>
        <button onClick={handleEditClick}>
          <FaUserEdit className="editcg" />
        </button>
      </div>

      {caregivers?.id && (
        <>
          <div className="accountdetails">
            <h6>ID: {caregivers.id} </h6>
            <p>
              <b>Username:</b> &nbsp; {caregivers.cgauser}
              <br />
              <br />
              <b>Password:</b> &nbsp;{" "}
              {showPassword ? caregivers.cgapass : "*****"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="showpass" onClick={togglePassword}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </p>
          </div>

          <div className="personal">
            <h2>Personal Details</h2>
            <p>
              <b>Name:</b> &nbsp;&nbsp; {caregivers.firstname} <br />
              <br />
              <b>Birthdate:</b>&nbsp;&nbsp; {caregivers.birth}
              <br />
              <br />
              <b>Gender:</b>&nbsp;&nbsp; {caregivers.gender} <br />
              <br />
              <b>Age:</b>&nbsp;&nbsp; {caregivers.age} <br />
              <br />
            </p>
            <a>
              <b>Contact No.:</b> &nbsp;&nbsp; {caregivers.contact} <br />
              <br />
              <b>Email:</b>&nbsp;&nbsp; {caregivers.email}
              <br />
              <br />
              <b>Address:</b>&nbsp;&nbsp; {caregivers.street}
              <br />
              <br />
            </a>
          </div>

          <div className="employment">
            <h2>Employment Details</h2>
            <p>
              <b>Years of Experience:</b> &nbsp;&nbsp; {caregivers.exp} <br />
              <br />
              <b>Availability:</b>&nbsp;&nbsp; {caregivers.availability}
              <br />
              <br />
              <b>Preferred work hours:</b>&nbsp;&nbsp; {caregivers.workhours}{" "}
              <br />
              <br />
            </p>
            <a>
              <b>CPR/First Aid Certification:</b> &nbsp;&nbsp; {caregivers.cpr}{" "}
              <br />
              <br />
            </a>
          </div>

          <div className="contacts">
            <h2>Emergency Contact</h2>
            <p>
              <b>Name:</b> &nbsp;&nbsp; {caregivers.ecfirst} <br />
              <br />
              <b>Relationship:</b>&nbsp;&nbsp; {caregivers.ecrel}
              <br />
              <br />
              <b>Contact No.:</b>&nbsp;&nbsp; {caregivers.ecnum} <br />
              <br />
              <b>Email:</b>&nbsp;&nbsp; {caregivers.ecemail} <br />
              <br />
            </p>
            <a>
              <b>Address:</b> &nbsp;&nbsp; {caregivers.ecst}
            </a>
          </div>
        </>
      )}

      {isEditing && (
        <div className="popupcg">
          <div className="popupcg-content">
            <IoMdCloseCircleOutline
              onClick={handleClosePopup}
              className="editclose"
            />
            <h3>Edit Caregiver Details</h3>
            <br />
            <form onSubmit={handleSubmit}>
              <h4>Account Details</h4>
              <br />
              <label>
                Username: &nbsp;
                <input type="text" defaultValue={caregivers.cgauser} />
              </label>
              <br />
              <br />
              <label>
                Password: &nbsp; &nbsp;
                <input type="text" defaultValue={caregivers.cgapass} />
              </label>
              <br />
              <br />
              <h4>Personal Details</h4>
              <br />
              <label>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.firstname} />
              </label>
              <br />
              <br />
              <label>
                Birthdate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.birth} />
              </label>
              <br />
              <br />
              <label>
                Gender:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.gender} />
              </label>
              <br />
              <br />
              <label>
                Age:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.age} />
              </label>
              <br />
              <br />
              <label>
                Contact No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.contact} />
              </label>
              <br />
              <br />
              <label>
                Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.email} />
              </label>
              <br />
              <br />
              <label>
                Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.street} />
              </label>
              <br />
              <br />
              <h4>Employment Details</h4>
              <br />
              <label>
                Years of Experience:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.exp} />
              </label>
              <br />
              <br />
              <label>
                Availability:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.availability} />
              </label>
              <br />
              <br />
              <label>
                Preferred Work Hours:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.workhours} />
              </label>
              <br />
              <br />
              <label>
                CPR Certification:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.cpr} />
              </label>
              <br />
              <br />
              <h4>Emergency Contact</h4>
              <br />
              <label>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecfirst} />
              </label>
              <br />
              <br />
              <label>
                Relationship:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecrel} />
              </label>
              <br />
              <br />
              <label>
                Contact No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecnum} />
              </label>
              <br />
              <br />
              <label>
                Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecemail} />
              </label>
              <br />
              <br />
              <label>
                Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecst} />
              </label>
              <br />
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCg;

/** const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3308/api/caregivers");
      const data = await response.json();
      setCaregiver(data[0]); //when change the inputs corresponds to the id
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); */

/**  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3308/api/caregivers");
      const data = await response.json();
      setCaregiver(data[0]); //when change the inputs corresponds to the id
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [id]); */
