import React, { useEffect, useState } from "react";
import axios from "axios";
import Side from "../dashboard/side";
import { PieChart } from "@mui/x-charts/PieChart";
import { IoMdArrowRoundBack } from "react-icons/io";

const progressPie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5124/api/progresspie"
        );
        const taskEntries = response.data;
        console.log("Fetched task entries:", taskEntries);

        // Prepare data for the pie chart
        const pieData = taskEntries.map((entry) => {
          const completedPercentage =
            entry.total_tasks > 0
              ? (entry.completed_tasks / entry.total_tasks) * 100
              : 0;

          return {
            id: entry.time_of_day,
            value: completedPercentage,
            label:
              entry.time_of_day.charAt(0).toUpperCase() +
              entry.time_of_day.slice(1), // Capitalize the label
            color:
              entry.time_of_day === "morning"
                ? "#f2f2f2"
                : entry.time_of_day === "afternoon"
                ? "#e8e3d9"
                : "#192746",
          };
        });

        console.log("Pie Chart Data:", pieData); // Log the pie chart data

        setData(pieData);
      } catch (error) {
        console.error("Error fetching task entries:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Side />

      <div className="pPie">
        <a href="/dashboard" className="barrow">
          <IoMdArrowRoundBack />
        </a>

        <PieChart
          className="pie"
          series={[{ data }]} // Ensure data is passed correctly
          width={1000}
          height={500}
        />

        {/* Overlay images */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src="morning.png"
            alt="Morning"
            style={{
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "-60px",
              left: "350px",
            }}
          />
          <img
            src="afternoon.png"
            alt="Afternoon"
            style={{
              width: "50px",
              height: "50px",
              position: "absolute",
              top: "30px",
              left: "300px",
            }}
          />
          <img
            src="evening.png"
            alt="Evening"
            style={{
              width: "70px",
              height: "70px",
              position: "absolute",
              top: "-70px",
              left: "235px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default progressPie;
