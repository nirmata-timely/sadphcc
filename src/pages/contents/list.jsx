import React from "react";
import { MdFreeBreakfast } from "react-icons/md";
import { FaShower } from "react-icons/fa6";

const activity = [
  {
    act: <MdFreeBreakfast />,
    name: "Carla Mae",
    actname: "Breakfast",
    time: "6:45am",
  },
];

const list = () => {
  return (
    <div>
      <div className="recent-updates">
        <h2>Activity Updates</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Caregiver</th>
              <th>Activity</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <FaShower />
              </td>
              <td>Carla Mae</td>
              <td>Breakfast</td>
              <td>8:30am</td>
            </tr>
            <tr>
              <td>
                <FaShower />
              </td>
              <td>Carla Mae</td>
              <td>Breakfast</td>
              <td>8:30am</td>
            </tr>
            <tr>
              <td>
                <FaShower />
              </td>
              <td>Carla Mae</td>
              <td>Breakfast</td>
              <td>8:30am</td>
            </tr>
            <tr>
              <td>
                <FaShower />
              </td>
              <td>Carla Mae</td>
              <td>Breakfast</td>
              <td>8:30am</td>
            </tr>
            <tr>
              <td>
                <MdFreeBreakfast />
              </td>
              <td>Carla Mae</td>
              <td>Breakfast</td>
              <td>8:30am</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default list;

/**{
    act: <FaShower />,
    name: "John Martin",
    actname: "Bath",
    time: "8:30am",
  },
  {
    act: <FaShower />,
    name: "John Martin",
    actname: "Bath",
    time: "8:30am",
  },
  {
    act: <FaShower />,
    name: "John Martin",
    actname: "Bath",
    time: "8:30am",
  },
  {
    act: <FaShower />,
    name: "John Martin",
    actname: "Bath",
    time: "8:30am",
  }, */
