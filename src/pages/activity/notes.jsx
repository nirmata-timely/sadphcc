import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { GiPin } from "react-icons/gi";
import { FaNoteSticky } from "react-icons/fa6";
import { PiFirstAidKitFill } from "react-icons/pi";
import { TbMessageReportFilled } from "react-icons/tb";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { BiSolidNotepad } from "react-icons/bi";

const notesColumns = [
  {
    name: "Notes ",
    selector: (row) => row.notes,
  },
];

const notesData = [
  {
    notes: (
      <div>
        <TfiCommentsSmiley /> &nbsp; &nbsp; Patient enjoyed breakfast and ate
        everything on their plate.
      </div>
    ),
  },
];

const customStyles = {
  rows: {
    style: {
      backgroundColor: "#fcf5db",
    },
  },
  headCells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "8px",
      backgroundColor: "#fcf5db",
    },
  },
  cells: {
    style: {
      paddingLeft: "25px",
      paddingRight: "2px",
      backgroundColor: "#fcf5db",
    },
  },
};

const notes = () => {
  const [records, setRecords] = useState(notesData);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();

    const newData = notesData.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchTerm) ||
        row.status?.props?.children.toLowerCase().includes(searchTerm)
      );
    });
    setRecords(newData);
  }

  return (
    <div className="notes">
      <h2>Feedback & Reports</h2>

      <div className="note">
        <DataTable
          customStyles={customStyles}
          columns={notesColumns}
          data={records}
          fixedHeader
        ></DataTable>
      </div>
    </div>
  );
};

export default notes;
