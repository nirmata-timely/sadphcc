import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

const pie = () => {
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
            color:
              entry.time_of_day === "morning" || entry.time_of_day === "evening"
                ? "#d3d3d3"
                : entry.time_of_day === "afternoon"
                ? "#e8e3d9"
                : "#192746",
          };
        });

        // Define pie data with equal sections and labels
        const completePieData = [
          { id: "morning", value: 33.33, label: "Morning", color: "#f2f2f2" }, // Morning section
          {
            id: "afternoon",
            value: 33.33,
            label: "Afternoon",
            color: "#e8e3d9",
          }, // Afternoon section
          { id: "evening", value: 33.33, label: "Evening", color: "#192746" }, // Evening section
        ];

        console.log("Pie Chart Data:", completePieData); // Log the pie chart data

        setData(completePieData);
      } catch (error) {
        console.error("Error fetching task entries:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="piecon">
        <h2>Progress Pie</h2>
        {/*<img src="pie.png" className="pie_img" />*/}

        <PieChart
          className="piedash"
          series={[{ data }]} // Ensure data is passed correctly
          width={500}
          height={250}
        />

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
              width: "25px",
              height: "25px",
              position: "absolute",
              top: "-23px",
              left: "-55px",
            }}
          />
          <img
            src="afternoon.png"
            alt="Afternoon"
            style={{
              width: "25px",
              height: "25px",
              position: "absolute",
              top: "30px",
              left: "-80px",
            }}
          />
          <img
            src="evening.png"
            alt="Evening"
            style={{
              width: "35px",
              height: "35px",
              position: "absolute",
              top: "-30px",
              left: "-115px",
            }}
          />
        </div>

        <a href="/progressPie" className="progresspie">
          <MdKeyboardDoubleArrowRight />
        </a>
      </div>
    </div>
  );
};

export default pie;

/**{ id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" }, */
