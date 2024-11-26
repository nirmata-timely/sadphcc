import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import DataTable from "react-data-table-component";
import { FaCheck } from "react-icons/fa6";
import axios from "axios";

const adlColumns = [
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
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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

const morning = () => {
  const [records, setRecords] = useState([]);
  const [selectedTime, setSelectedTime] = useState("Morning");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMorningData = async () => {
      try {
        const response = await axios.get("http://localhost:5124/api/morning");
        console.log("Fetched records:", response.data);
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching morning data:", error);
      }
    };

    fetchMorningData();
  }, []);

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
  };

  return (
    <div>
      <div className="morning">
        <DataTable
          className="adlmorning"
          customStyles={customStyles}
          columns={adlColumns}
          data={records}
          fixedHeader
        ></DataTable>
      </div>
    </div>
  );
};

export default morning;
