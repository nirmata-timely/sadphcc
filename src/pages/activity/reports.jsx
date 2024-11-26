import React from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Report Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Date",
    selector: "date",
    sortable: true,
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
];

const data = [
  { id: 1, name: "Report 1", date: "2023-01-01", status: "Completed" },
  { id: 2, name: "Report 2", date: "2023-01-02", status: "Pending" },
  // ... more data as needed
];

const reports = () => {
  return (
    <div>
      <DataTable title="Reports" columns={columns} data={data} pagination />
    </div>
  );
};

export default reports;
