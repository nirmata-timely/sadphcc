import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaCheck, FaBorderAll, FaTasks } from "react-icons/fa";
import Side from "../dashboard/side";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { IoMdArrowRoundBack } from "react-icons/io";
import Patients from "../Patients";

const taskColumns = [
  {
    name: "Caregiver",
    selector: (row) => row.firstname,
    sortable: true,
  },
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

const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "25px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "25px", // override the cell padding for data cells
      paddingRight: "40px",
    },
  },
};

const PatAdl = ({ elderlyprofile, caregivers }) => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchPatAdlData = async () => {
      try {
        const response = await axios.get("http://localhost:5124/api/patadl");
        console.log("Fetched records:", response.data);
        setRecords(response.data);
        setFilteredRecords(response.data);

        // Set selectedDate to the latest date from the records
        const latestDate = response.data.reduce((latest, record) => {
          return new Date(record.task_date) > new Date(latest)
            ? record.task_date
            : latest;
        }, "");
        setSelectedDate(latestDate); // Update selectedDate to the latest date
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatAdlData();
  }, []);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();

    const newData = records.filter((row) => {
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

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      alert("No task selected!");
      return;
    }

    try {
      const selectedIds = selectedRows.map((row) => row.id); // Ensure 'id' exists in selectedRows
      console.log("Selected IDs for deletion:", selectedIds); // Debugging line

      const response = await axios.delete(
        "http://localhost:5124/api/taskslist",
        {
          data: { ids: selectedIds },
        }
      );

      if (response.status === 200) {
        await fetchData();
        setSelectedRows([]);
        alert("Tasks deleted successfully!");
      } else {
        alert("Failed to delete tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting tasks:", error);
      alert("Error deleting tasks. Please try again.");
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5124/api/progresspie"
        );
        const taskEntries = response.data;
        console.log("Fetched task entries:", taskEntries);

        // Prepare data for the pie chart
        const pieData = taskEntries.map((entry) => {
          const completedPercentage =
            entry.total_tasks > 0
              ? (entry.completed_tasks / entry.total_tasks) * 100
              : 0;

          return {
            id: entry.time_of_day,
            value: completedPercentage,
            label:
              entry.time_of_day.charAt(0).toUpperCase() +
              entry.time_of_day.slice(1), // Capitalize the label
            color:
              entry.time_of_day === "morning"
                ? "#f2f2f2"
                : entry.time_of_day === "afternoon"
                ? "#e8e3d9"
                : "#192746",
          };
        });

        console.log("Pie Chart Data:", pieData); // Log the pie chart data

        setData(pieData);
      } catch (error) {
        console.error("Error fetching task entries:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Selected Date: ${date}`);
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value; // Get the new date from the input
    setSelectedDate(newDate); // Update selectedDate state
    const newData = records.filter((row) => {
      return row.task_date === newDate; // Filter records based on selected date
    });
    setFilteredRecords(newData); // Update filtered records
  };

  return (
    <div>
      <Side />

      <div className="patientsAdl"></div>

      <input
        type="text"
        placeholder="Search...                           🔍"
        onChange={handleFilter}
        className="searchpatadl"
      />

      <form onSubmit={handleSubmit} className="dateform">
        <label className="datepattext">Date:</label>
        <input
          className="datepat"
          type="date"
          id="date"
          name="date"
          value={selectedDate} // Ensure it reflects the task_date or is empty
          onChange={handleDateChange} // Handle date change
        />
      </form>

      <div className="patadl">
        <h2> Activity of Daily Living</h2>
        <DataTable
          customStyles={customStyles}
          columns={taskColumns}
          data={filteredRecords}
          fixedHeader
          pagination
        ></DataTable>
      </div>

      <div className="">
        <PieChart
          className="pie"
          series={[{ data }]} // Ensure data is passed correctly
          width={1000}
          height={500}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="morning.png"
            alt="Morning"
            style={{
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "-60px",
              left: "200px",
            }}
          />
          <img
            src="afternoon.png"
            alt="Afternoon"
            style={{
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "10px",
              left: "100px",
            }}
          />
          <img
            src="evening.png"
            alt="Evening"
            style={{
              width: "70px",
              height: "70px",
              position: "absolute",
              top: "-120px",
              left: "85px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatAdl;

/** incidents: "❌", 
 * 
 * {
    name: "Caregiver",
    selector: (row) => row.firstname,
    sortable: true,
  },
  {
    name: "Patient",
    selector: (row) => row.lastname,
    sortable: true,
  },

 {
    name: "Notes",
    selector: (row) => row.remarks,
    sortable: true,
  },  
  
  {
    name: "Date",
    selector: (row) => {
      const date = new Date(row.task_date);
      return date.toLocaleString("en-PH", { timeZone: "Asia/Manila" });
    },
  },*/
