import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Side from "../dashboard/side";
import DataTable from "react-data-table-component";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import Upnav from "../dashboard/upnav";

const Accounts = () => {
  const [owners, setOwners] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [editedData, setEditedData] = useState({ USERNAME: "", PASSWORD: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    USERNAME: "",
    PASSWORD: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get("http://localhost:5124/api/owner");
        console.log("Fetched owners:", response.data);
        setOwners(response.data);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };

    fetchOwners();
  }, []);

  const handleViewClick = (owner) => {
    setSelectedOwner(owner);
    setEditedData(owner);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedOwner(null);
    setShowPassword(false);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_-]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validatePassword(editedData.PASSWORD);
    if (error) {
      setPasswordError(error);
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5124/api/owner/${editedData.OWNER_ID}`,
        editedData
      );

      if (response.data.success) {
        alert("Owner details updated successfully!");
        const updatedOwners = await axios.get(
          "http://localhost:5124/api/owner"
        );
        setOwners(updatedOwners.data);
        closeModal();
      } else {
        alert(response.data.message || "Failed to update owner details");
      }
    } catch (error) {
      console.error("Error updating owner details:", error);
      alert(
        error.response?.data?.message ||
          "Failed to update owner details. Please try again."
      );
    }
  };

  const openCreateModal = () => {
    setCreateModalIsOpen(true);
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setNewAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    const error = validatePassword(newAccountData.PASSWORD);
    if (error) {
      setPasswordError(error);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5124/api/owner",
        newAccountData
      );
      if (response.data.success) {
        alert("Account created successfully!");
        const updatedOwners = await axios.get(
          "http://localhost:5124/api/owner"
        );
        setOwners(updatedOwners.data);
        setCreateModalIsOpen(false);
      } else {
        alert(response.data.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert(
        error.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    }
  };

  const columns = [
    /* {
      name: "ID",
      selector: (row) => row.OWNER_ID,
      sortable: true,
    },*/
    {
      name: "Username",
      selector: (row) => row.USERNAME,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button className="viewprof" onClick={() => handleViewClick(row)}>
          View
        </button>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        position: "sticky",
      },
    },
    rows: {
      style: {
        minHeight: "40px",
        backgroundColor: "#EBEEF6",
        padding: "12px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "55px",
        paddingRight: "8px",
        backgroundColor: "#EBEEF6",
      },
    },
    cells: {
      style: {
        paddingLeft: "55px",
        paddingRight: "40px",
      },
    },
  };

  const Modal = ({ isOpen, onClose, owner }) => {
    if (!isOpen || !owner) return null;

    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.content}>
          <button
            className="buttonClose"
            onClick={onClose}
            style={modalStyles.closeButton}
          >
            X
          </button>
          <h2 className="ownerDetails">Owner Details</h2>
          <form onSubmit={handleSubmit}>
            <label className="ownerlabel">
              Username: &nbsp;
              <input
                ref={usernameRef}
                className="editUsername"
                type="text"
                name="USERNAME"
                value={editedData.USERNAME}
                onChange={handleInputChange}
                autoComplete="off"
              />
            </label>
            <br /> <br />
            <label className="passwordlabel">
              Password: &nbsp;&nbsp;
              <input
                ref={passwordRef}
                className="editPassword"
                type={showPassword ? "text" : "password"}
                name="PASSWORD"
                value={editedData.PASSWORD}
                onChange={handleInputChange}
                autoComplete="off"
              />
              <button
                className="buttonShow"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </label>
            {passwordError && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {passwordError}
              </div>
            )}
            <br /> <br />
            <br /> <br />
            <button className="buttonSave" type="submit">
              Save
            </button>
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "20px",
                marginLeft: "20px",
              }}
            >
              <div style={{ color: "red", marginBottom: "10px" }}>
                Please ensure your password meets all requirements below:
              </div>
              Password must contain:
              <ul style={{ marginLeft: "20px" }}>
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
              <div style={{ marginTop: "5px" }}>
                Sample valid password:{" "}
                <span style={{ fontFamily: "monospace" }}>Welcome@2024</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      background: "white",
      padding: "20px",
      borderRadius: "20px",
      width: "300px",
      position: "relative",
      height: "450px",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      border: "none",
      background: "none",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <div>
      <Side />
      <Upnav />
      <div className="acon">
        <img src="owner.png" className="img"></img>
        <p className="dash">Owner</p>
      </div>
      <img src="caregiver.png" className="icon"></img>
      <IoIosAddCircleOutline className="addowner" onClick={openCreateModal} />
      <div className="ownertable">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={owners}
          highlightOnHover
        />
      </div>
      <Modal isOpen={modalIsOpen} onClose={closeModal} owner={selectedOwner} />
      {createModalIsOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <button
              className="buttonClose"
              onClick={() => setCreateModalIsOpen(false)}
              style={modalStyles.closeButton}
            >
              X
            </button>
            <h2 className="ownerDetails">Create New Account</h2>
            <form onSubmit={handleCreateSubmit}>
              <label className="ownerlabel">
                Username: &nbsp;
                <input
                  className="editUsername"
                  type="text"
                  name="USERNAME"
                  value={newAccountData.USERNAME}
                  onChange={handleCreateInputChange}
                  autoComplete="off"
                />
              </label>
              <br /> <br />
              <label className="passwordlabel">
                Password: &nbsp;&nbsp;
                <input
                  className="editPassword"
                  type={showPassword ? "text" : "password"}
                  name="PASSWORD"
                  value={newAccountData.PASSWORD}
                  onChange={handleCreateInputChange}
                  autoComplete="off"
                />
                <button
                  className="buttonShow"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </label>
              {passwordError && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {passwordError}
                </div>
              )}
              <br />
              <button className="buttonSave" type="submit">
                Save
              </button>
              <div
                style={{ fontSize: "12px", color: "#666", marginTop: "20px" }}
              >
                <div style={{ color: "red", marginBottom: "10px" }}>
                  Please ensure your password meets all requirements below:
                </div>
                Password must contain:
                <ul style={{ marginLeft: "20px" }}>
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
                <div style={{ marginTop: "5px" }}>
                  Sample valid password:{" "}
                  <span style={{ fontFamily: "monospace" }}>Welcome@2024</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
