import React, { useState, useEffect } from "react";
import Side from "./dashboard/side";
import DataTable from "react-data-table-component";
import axios from "axios";

const logColumns = [
  {
    name: "User",
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
    },
  },
  rows: {
    style: {
      minHeight: "40px",
      backgroundColor: "#EBEEF6",
      padding: "12px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "55px",
      paddingRight: "8px",
      backgroundColor: "#EBEEF6",
    },
  },
  cells: {
    style: {
      paddingLeft: "55px",
      paddingRight: "40px",
    },
  },
};

const Logs = () => {
  const [owners, setOwners] = useState([]);
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    const fetchOwnerLogins = async () => {
      try {
        const response = await axios.get("http://localhost:5124/api/logs");
        setOwners(response.data);
        setAllRecords(response.data);
      } catch (error) {
        console.error("Error fetching owner login data:", error);
      }
    };

    fetchOwnerLogins();
  }, []);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setOwners(allRecords);
    } else {
      const filteredData = allRecords.filter(
        (row) =>
          row.username.toLowerCase().includes(searchTerm) ||
          row.activityType.toLowerCase().includes(searchTerm)
      );
      setOwners(filteredData);
    }
  }

  return (
    <div>
      <Side />

      <input
        type="text"
        placeholder="Search...                           🔍"
        onChange={handleFilter}
        className="searchlogs"
      />

      <div className="logs">
        <br />
        <DataTable
          customStyles={customStyles}
          columns={logColumns}
          data={owners}
          pagination
          fixedHeader
        />
      </div>
    </div>
  );
};

export default Logs;

/** {
    name: "ID",
    selector: (row) => row.logs_id,
    sortable: true,
  }, */
