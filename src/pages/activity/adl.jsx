import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaCheck, FaBorderAll, FaTasks } from "react-icons/fa";
import Side from "../dashboard/side";
import { IoIosArrowForward } from "react-icons/io";

const taskColumns = [
  {
    name: "Caregiver",
    selector: (row) => row.cgname,
    sortable: true,
  },
  {
    name: "Patient Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Oral Hygiene",
    selector: (row) => row.hygiene,
    sortable: true,
  },
  {
    name: "Bath",
    selector: (row) => row.bath,
    sortable: true,
  },
  {
    name: "Incidents",
    selector: (row) => row.incidents,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
];

const taskData = [
  {
    id: 1,
    cgname: "John",
    name: "Carla",
    hygiene: <FaCheck />,
    bath: <FaCheck />,
    groom: <FaCheck />,
    snack: <FaCheck />,
    vitals: <FaCheck />,
    incidents: "❌",
    status: <a className="done">Done</a>,
    action: (
      <div>
        <a href="/ViewCg" className="viewadl ">
          <u>View ADL</u>
        </a>
      </div>
    ),
  },
  {
    id: 2,
    name: "Martin",
    hygiene: <FaCheck />,
    bath: <FaCheck />,
    groom: <FaCheck />,
    snack: <FaCheck />,
    vitals: <FaCheck />,
    status: <a className="done">Done</a>,
    incidents: "❌",
  },
  {
    id: 3,
    name: "Rexchel",
    hygiene: <FaCheck />,
    bath: <FaCheck />,
    groom: <FaCheck />,
    snack: <FaCheck />,
    vitals: <FaCheck />,
    status: <a className="done">Done</a>,
    incidents: "❌",
  },
  {
    id: 4,
    name: "Randel",
    hygiene: <FaCheck />,
    bath: <FaCheck />,
    groom: "❌",
    snack: <FaCheck />,
    vitals: <FaCheck />,
    status: <a className="pending">Pending</a>,
    incidents: "❌",
  },
  {
    id: 5,
    name: "Precious",
    hygiene: <FaCheck />,
    bath: <FaCheck />,
    groom: <FaCheck />,
    snack: <FaCheck />,
    vitals: <FaCheck />,
    status: <a className="pending">In progress</a>,
    incidents: "❌",
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

const adl = () => {
  const [records, setRecords] = useState(taskData);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();

    const newData = taskData.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchTerm) ||
        row.status?.props?.children.toLowerCase().includes(searchTerm)
      );
    });
    setRecords(newData);
  }

  return (
    <div>
      <Side />
      <a href="/patAdl">
        <IoIosArrowForward className="nextadl" />
        <h2 className="nexth2"> Activity of Daily Living</h2>
      </a>{" "}
      <div className="task">
        <DataTable
          customStyles={customStyles}
          columns={taskColumns}
          data={records}
          fixedHeader
        ></DataTable>
      </div>
    </div>
  );
};

export default adl;

/**      <input
        type="text"
        placeholder="Search...                           🔍"
        onChange={handleFilter}
        className="search"
      /> */

/**{
    name: "Groom",
    selector: (row) => row.groom,
    sortable: true,
  },
  {
    name: "Snack",
    selector: (row) => row.snack,
    sortable: true,
  },
  {
    name: "Vitals",
    selector: (row) => row.vitals,
    sortable: true,
  }, */
