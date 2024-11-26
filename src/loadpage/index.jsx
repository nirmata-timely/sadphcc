import React from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="loadpage"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <center>
        <img
          src="sadphcc.png"
          style={{ width: "250px", height: "250px" }}
        ></img>
      </center>
    </div>
  );
};

export default Index;
