import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { IoIosArrowForward } from "react-icons/io";
import Side from "../dashboard/side";
import axios from "axios";

const tasklistColumns = [
  {
    name: "Task",
    selector: (row) => row.task_name,
    sortable: true,
    width: "20%",
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
    width: "40%",
  },
  {
    name: "Scheduled Time",
    selector: (row) => {
      const time = new Date(`2000-01-01T${row.sched_time}`);
      return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
    sortable: true,
    width: "20%",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    width: "20%",
    cell: (row) => (
      <div className={`status-badge ${row.status.toLowerCase()}`}>
        {row.status}
      </div>
    ),
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
      backgroundColor: "#ffffff",
      "&:nth-child(odd)": {
        backgroundColor: "#e4f8ed",
      },
    },
  },
  headCells: {
    style: {
      paddingLeft: "15px",
      paddingRight: "2px",
      backgroundColor: "#e4f8ed",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
  cells: {
    style: {
      paddingLeft: "15px",
      paddingRight: "0px",
    },
  },
};

const TaskList = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5124/api/tasks");
      setRecords(response.data);
      setFilteredRecords(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = records.filter((row) => {
      return (
        row.task_name.toLowerCase().includes(searchTerm) ||
        row.description.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredRecords(filteredData);
  };

  return (
    <div className="tasklist">
      <Side />
      <div className="tasklist-container">
        <div className="tasklist-header">
          <h2>Task List</h2>
          <a href="/taskslist">
            <IoIosArrowForward className="next" />
          </a>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={handleFilter}
            className="search-input"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="tasklist1">
          <DataTable
            customStyles={customStyles}
            columns={tasklistColumns}
            data={filteredRecords}
            fixedHeader
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
            progressPending={loading}
            progressComponent={<div>Loading tasks...</div>}
            noDataComponent={<div>No tasks found</div>}
            striped
          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
