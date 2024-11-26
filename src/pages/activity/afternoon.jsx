import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import DataTable from "react-data-table-component";
import { FaCheck } from "react-icons/fa6";
import Vitalsigns from "./vitalsigns";
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

const afternoon = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAfternoonData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5124/api/afternoon/${patientADL.id}`
        );
        console.log("Fetched records:", response.data); // Check structure here
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching Afternoon data:", error);
      }
    };
    fetchAfternoonData();
  }, []);

  return (
    <div>
      <div className="afternoon">
        <DataTable
          className="adlafternoon"
          customStyles={customStyles}
          columns={adlafColumns}
          data={records}
          fixedHeader
          pagination
        ></DataTable>
      </div>
      <Vitalsigns />
    </div>
  );
};

export default afternoon;

/**useEffect(() => {
    const fetchAfternoonData = async () => {
      try {
        const response = await axios.get("http://localhost:5124/api/afternoon");
        console.log("Fetched records:", response.data); // Check structure here
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching Afternoon data:", error);
      }
    };
    fetchAfternoonData();
  }, []); */
