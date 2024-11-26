import Side from "../dashboard/side";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  { name: "Day", selector: (row) => row.time_of_day, sortable: true },

  { name: "Total Tasks", selector: (row) => row.total_tasks, sortable: true },
  {
    name: "Completed Tasks",
    selector: (row) => row.completed_tasks,
    sortable: true,
  },
  {
    name: "Pending Tasks",
    selector: (row) => row.pending_tasks,
    sortable: true,
  },
  {
    name: "Completion %",
    selector: (row) => row.completed_percentage,
    sortable: true,
  },
  {
    name: "Pending %",
    selector: (row) => row.pending_percentage,
    sortable: true,
  },
];

const customStyles = {
  headRow: { style: { position: "sticky" } },
  rows: { style: { minHeight: "40px", backgroundColor: "#EBEEF6" } },
  headCells: {
    style: {
      paddingLeft: "55px",
      paddingRight: "8px",
      backgroundColor: "#EBEEF6",
    },
  },
  cells: { style: { paddingLeft: "55px", paddingRight: "40px" } },
};

const CaregiversCompletion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5124/api/caregiverscompletion"
        );
        setData(res.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Side />

      <div className="caregiverscompletion">
        <h1>Caregivers Tasks Completion</h1>
        <DataTable
          className=""
          columns={columns}
          customStyles={customStyles}
          data={data}
          pagination
        />
      </div>
    </div>
  );
};

export default CaregiversCompletion;
