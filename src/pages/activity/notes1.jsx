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
    name: " ",
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
  {
    notes: (
      <div>
        <TfiCommentsSmiley /> &nbsp; &nbsp; Patient was very responsive during
        daily exercise.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <TfiCommentsSmiley /> &nbsp; &nbsp; Grooming session went smoothly with
        no resistance.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <BiSolidNotepad /> &nbsp; &nbsp; Vitals checked: BP normal, heart rate
        stable.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <BiSolidNotepad /> &nbsp; &nbsp; Morning hygiene routine completed by
        9:00 AM.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <PiFirstAidKitFill /> &nbsp; &nbsp; Patient reported chest pain, nurse
        contacted immediately.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <BiSolidNotepad /> &nbsp; &nbsp; Diaper change completed at scheduled
        time with no issues.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <TfiCommentsSmiley /> &nbsp; &nbsp; Medication was taken without any
        difficulties.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <TfiCommentsSmiley /> &nbsp; &nbsp; Patient remained calm and
        cooperative during bathing.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <PiFirstAidKitFill /> &nbsp; &nbsp; Sudden drop in blood pressure,
        doctor notified.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <PiFirstAidKitFill /> &nbsp; &nbsp; Patient fell while getting out of
        bed, no major injuries.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <BiSolidNotepad /> &nbsp; &nbsp; Patient completed rosary prayer without
        needing much assistance.
      </div>
    ),
  },
  {
    notes: (
      <div>
        <PiFirstAidKitFill /> &nbsp; &nbsp; Caregiver noticed signs of
        infection, patient scheduled for check-up.
      </div>
    ),
  },
];

const customStyles = {
  rows: {
    style: {
      minHeight: "40px",
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

const notes1 = () => {
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
    <div className="">
      <h2>Feedback & Reports</h2>

      <div className="">
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

export default notes1;
