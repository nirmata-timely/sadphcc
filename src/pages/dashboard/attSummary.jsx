import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { BsPersonCheckFill } from "react-icons/bs";
import Side from "./side";
import Upnav from "./upnav";
import axios from "axios";

const attColumns = [
  {
    name: "Caregiver ID",
    selector: (row) => row.caregiverId,
    sortable: true,
  },
  {
    name: "Username",
    selector: (row) => row.username,
    sortable: true,
  },
  {
    name: "Activity Type",
    selector: (row) => row.activityType,
    sortable: true,
  },
  {
    name: "Date & Time",
    selector: (row) => {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      };
      return new Date(row.timestamp)
        .toLocaleString("en-PH", options)
        .replace(",", "");
    },
    sortable: true,
  },
];

const customStyles = {
  headRow: {
    style: {
      position: "sticky",
      backgroundColor: "#d0e4fb",
    },
  },
  rows: {
    style: {
      minHeight: "40px",
      backgroundColor: "#d0e4fb",
    },
  },
  headCells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "8px",
      backgroundColor: "#d0e4fb",
    },
  },
  cells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "40px",
      backgroundColor: "#d0e4fb",
    },
  },
};

const AttSummary = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5124/api/cgatt/");
        console.log("API response:", response.data);
        setRecords(response.data);
        setFilteredRecords(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();

    const newData = records.filter((row) => {
      return (
        row.caregiverId.toString().includes(searchTerm) ||
        (row.username && row.username.toLowerCase().includes(searchTerm)) ||
        (row.activityType &&
          row.activityType.toLowerCase().includes(searchTerm)) ||
        new Date(row.timestamp)
          .toLocaleString("en-PH", { timeZone: "Asia/Manila" })
          .includes(searchTerm)
      );
    });
    setFilteredRecords(newData);
  }

  return (
    <div>
      <Side />
      <Upnav />
      <div className="acon">
        <BsPersonCheckFill className="img" />
        <p className="dash">Attendance</p>
      </div>
      <input
        type="text"
        placeholder="Search...                           🔍"
        onChange={handleFilter}
        className="sattendance"
      />
      <div className="att">
        <DataTable
          customStyles={customStyles}
          columns={attColumns}
          data={filteredRecords}
          fixedHeader
          pagination
        />
      </div>
    </div>
  );
};

export default AttSummary;
