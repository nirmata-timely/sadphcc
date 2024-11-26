import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaGreaterThan } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const statusColumns = [
  {
    name: "Caregiver Name",
    selector: (row) => row.name,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
];

const statusData = [
  {
    id: 1,
    name: "Carla",
    status: <a className="done">On Duty</a>,
    action: (
      <div>
        <a href="/attSummary" className="viewadl ">
          <FaGreaterThan />
        </a>
      </div>
    ),
  },
  {
    id: 2,
    name: "John",
    status: <a className="done">On Duty</a>,
    action: (
      <div>
        <a href="/attSummary" className="viewadl ">
          <FaGreaterThan />
        </a>
      </div>
    ),
  },
  {
    id: 3,
    name: "Mae",
    status: <a className="done">On Duty</a>,
    action: (
      <div>
        <a href="/attSummary" className="viewadl ">
          <FaGreaterThan />
        </a>
      </div>
    ),
  },
  {
    id: 4,
    name: "Martin",
    status: <a className="done">On Duty</a>,
    action: (
      <div>
        <a href="/attSummary" className="viewadl ">
          <FaGreaterThan />
        </a>
      </div>
    ),
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
      backgroundColor: "#f6f6f6",
    },
  },
  headCells: {
    style: {
      paddingLeft: "25px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#f6f6f6",
    },
  },
  cells: {
    style: {
      paddingLeft: "25px", // override the cell padding for data cells
      paddingRight: "40px",
      backgroundColor: "#f6f6f6",
    },
  },
};

const attendance = () => {
  const [records, setRecords] = useState(statusData);

  function handleFilter(event) {
    const newData = statusData.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div className="attendance">
      <h2> Caregiver Attendance</h2>
      <a href="/attSummary">
        <IoIosArrowForward className="attnext" />
      </a>
      <DataTable
        customStyles={customStyles}
        columns={statusColumns}
        data={records}
        fixedHeader
      ></DataTable>
    </div>
  );
};

export default attendance;
