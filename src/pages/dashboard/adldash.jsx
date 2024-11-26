import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaCheck, FaBorderAll } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const taskColumns = [
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
    name: "Groom",
    selector: (row) => row.groom,
    sortable: true,
  },
];

const taskData = [
  {
    id: 1,
    name: "Carla",
    hygiene: <FaCheck />,
    bath: <FaCheck />,
    groom: <FaCheck />,
    snack: <FaCheck />,
    vitals: <FaCheck />,
    incidents: "❌",
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
    incidents: "❌",
  },
  {
    id: 4,
    name: "Randel",
    hygiene: <FaCheck />,
    bath: <FaCheck />,
    groom: <FaCheck />,
    snack: <FaCheck />,
    vitals: <FaCheck />,
    incidents: "❌",
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
      backgroundColor: "#EBEEF6",
    },
  },
  headCells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "8px",
      backgroundColor: "#EBEEF6",
    },
  },
  cells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "40px",
      color: "#01205C",
      backgroundColor: "#EBEEF6",
    },
  },
};

const adldash = () => {
  const [records, setRecords] = useState(taskData);

  function handleFilter(event) {
    const newData = taskData.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div>
      <div className="adl">
        <h2>
          {" "}
          Patient's ADL{" "}
          <a href="/PatAdl">
            {" "}
            <IoIosArrowForward className="proadl" />
          </a>
        </h2>
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

export default adldash;
