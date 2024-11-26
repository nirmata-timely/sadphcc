import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5124/login", {
        username,
        password,
      });
      console.log("Response:", response.data);
      if (response.data.success) {
        console.log("Login successful!");
        localStorage.setItem("username", username);
        navigate("/dashboard");
      } else {
        alert(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="container">
      <img
        src="sadphcc.png"
        className="sadp"
        style={{ width: "260px", height: "auto" }}
      />
      <br />
      <br />

      <form onSubmit={handleLogin}>
        <div>
          <input
            className="inpute"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <input
            className="inputp"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="showpasslogin"
            type="button"
            onClick={togglePassword}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
        <br />
        <button type="submit" className="login">
          Login
        </button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default Login;
