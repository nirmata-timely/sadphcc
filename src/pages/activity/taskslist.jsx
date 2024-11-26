import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { IoIosAddCircleOutline } from "react-icons/io";
import Side from "../dashboard/side";
import Addtasks from "./addtasks";
import { MdDelete } from "react-icons/md";
import axios from "axios";

//task
const tasklistColumns = [
  { name: "Task", selector: (row) => row.task_name },
  { name: "Description", selector: (row) => row.description },
];

const customStyles = {
  headRow: { style: { position: "sticky" } },
  rows: { style: { minHeight: "40px", backgroundColor: "#e4f8ed" } },
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

const TasksList = () => {
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5124/api/taskslist");
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = records.filter(
      (row) =>
        row.task_name.toLowerCase().includes(searchTerm) ||
        row.description.toLowerCase().includes(searchTerm)
    );
    setFilteredRecords(filteredData);
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      alert("No task selected!");
      return;
    }

    try {
      const selectedIds = selectedRows.map((row) => row.id);
      await axios.delete("http://localhost:5124/api/taskslist", {
        data: { ids: selectedIds },
      });

      // Refresh the data after successful deletion
      await fetchData();
      setSelectedRows([]);
      alert("Tasks deleted successfully!");
    } catch (error) {
      console.error("Error deleting tasks:", error);
      alert("Error deleting tasks. Please try again.");
    }
  };

  return (
    <div>
      <div className="taskslist">
        <Side />
        <h2>Task List</h2>
        <input
          type="text"
          placeholder="Search...                          🔍"
          onChange={handleFilter}
          className="searchtasks"
        />

        <a href="/createtaskassign">
          <IoIosAddCircleOutline className="addtasks" />
        </a>

        <button onClick={handleDeleteSelected} className="deletetasks-btn">
          <MdDelete className="deletetasks" />
        </button>

        <DataTable
          customStyles={customStyles}
          columns={tasklistColumns}
          data={filteredRecords}
          fixedHeader
          selectableRows
          onSelectedRowsChange={(state) => setSelectedRows(state.selectedRows)}
          pagination
        />
      </div>
    </div>
  );
};

export default TasksList;

/**
 * { name: "Scheduled Time", selector: (row) => row.sched_time },
 */
