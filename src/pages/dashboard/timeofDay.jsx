import React from "react";

const timeofDay = () => {
  return (
    <div className="timeofday">
      <h2>Time of Day</h2>

      <div className="timeofday1">
        <h3>Morning</h3>
        <img src="morning1.png" alt="Morning" />
      </div>

      <div className="timeofday2">
        <h3>Afternoon</h3>
        <img src="afternoon1.png" alt="Afternoon" />
      </div>
      <div className="timeofday3">
        <h3>Evening</h3>
        <img src="evening1.png"></img>
      </div>
    </div>
  );
};

export default timeofDay;
