import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import DataTable from "react-data-table-component";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";

const adlafColumns = [
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
  {
    name: "Date",
    selector: (row) => {
      const date = new Date(row.task_date);
      return date.toLocaleString("en-PH", { timeZone: "Asia/Manila" });
    },
  },
  {
    name: "Notes",
    selector: (row) => row.remarks,
  },
];

const customStyles = {
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

const afternoon = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchEveningData = async () => {
      try {
        const response = await axios.get("http://localhost:5124/api/evening");
        console.log("Fetched records:", response.data);
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching Evening data:", error);
      }
    };
    fetchEveningData();
  }, []);

  return (
    <div>
      <div className="evening">
        <DataTable
          customStyles={customStyles}
          columns={adlafColumns}
          data={records}
          fixedHeader
        ></DataTable>
      </div>
    </div>
  );
};

export default afternoon;
