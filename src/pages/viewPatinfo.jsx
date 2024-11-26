import { useState } from "react";
import Side from "./dashboard/side";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye, FaUserEdit } from "react-icons/fa";

const ViewPatInfo = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={showPopup ? "" : ""}>
      <Side />

      <div className="viewcg">
        <a href="/Patients">
          <IoMdArrowRoundBack />
        </a>
        <img src="patient.png" alt="Admin" />
        <h2>Patient Account Details</h2>
        <button onClick={togglePopup}>
          <FaUserEdit className="editcg" />
        </button>
      </div>

      <div className="personalpat">
        <p>
          <b>Name:</b> &nbsp;&nbsp; John Martin Sarcia <br />
          <br />
          <b>Nickname:</b> &nbsp;&nbsp; Martin <br />
          <br />
          <b>Age:</b>&nbsp;&nbsp; 22 <br />
          <br />
          <b>Birthdate:</b>&nbsp;&nbsp; September 2, 2002
          <br />
          <br />
        </p>
      </div>

      <div className="medhistory">
        <h2>Medical History</h2>
        <h4>Surgical History</h4>
        <div className="medetails">
          <p>
            <b>Surgery:</b> &nbsp;&nbsp; Appendectomy <br />
            <br />
            <b>Date of Surgery:</b>&nbsp;&nbsp; 12/06/2020
            <br />
            <br />
            <b>Surgical Outcome:</b>&nbsp;&nbsp; Successful
            <br />
            <br />
          </p>
        </div>
      </div>

      <div className="medicalConditions">
        <h2>Medical Conditions</h2>
        <h4>Medications</h4>
        <p>
          <b>Chronic Illnesses:</b> &nbsp;&nbsp; Diabetes <br />
          <br />
          <b>Allergies:</b>&nbsp;&nbsp; Peanuts, Dairy, Wheat
          <br />
          <br />
        </p>
        <a>
          <b>Name:</b> &nbsp;&nbsp; Insulin Glargine <br />
          <br />
          <b>Dosage:</b>&nbsp;&nbsp; Varies; typically 10 to 20 units per day,
          adjusted based on blood glucose levels. <br />
          <br />
          <b>Frequency:</b>&nbsp;&nbsp; Injected once daily <br />
          <br />
        </a>
      </div>

      <div className="patcontacts">
        <h2>Emergency Contact</h2>
        <p>
          <b>Name:</b> &nbsp;&nbsp; Carla Mae Tuazon <br />
          <br />
          <b>Relationship:</b>&nbsp;&nbsp; Wife
          <br />
          <br />
          <b>Contact No.:</b>&nbsp;&nbsp; 09123456789 <br />
          <br />
          <b>Email:</b>&nbsp;&nbsp; mae@gmail.com <br />
          <br />
        </p>
        <a>
          <b>Address:</b> &nbsp;&nbsp; Mandaluyong City
        </a>
      </div>

      {showPopup && (
        <div className="popuppat">
          <div className="popuppat-content">
            <h3>Edit Patient Details</h3>
            <form>
              <label>
                <br></br>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="name"
                  defaultValue="John Martin Sarcia"
                />
              </label>
              <br></br>
              <label>
                Nickname: &nbsp;
                <input type="text" name="nickname" defaultValue="Martin" />
              </label>
              <br></br>
              <label>
                Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="number" name="age" defaultValue={22} />
              </label>
              <br></br>
              <label>
                Birthdate:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="date" name="birthdate" defaultValue="2002-09-02" />
              </label>
              <br></br>
              <br></br>
              <h4>Surgical History</h4>
              <label>
                <br></br>
                Surgery: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" name="surgery" defaultValue="Appendectomy" />
              </label>
              <br></br>
              <label>
                Date of Surgery: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  name="dateOfSurgery"
                  defaultValue="2020-12-06"
                />
              </label>
              <br></br>
              <label>
                Surgical Outcome: &nbsp;&nbsp;
                <input
                  type="text"
                  name="surgicalOutcome"
                  defaultValue="Successful"
                />
              </label>
              <br></br>
              <br></br>

              <h4>Medications</h4>
              <br></br>
              <label>
                Chronic Illnesses: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="chronicIllnesses"
                  defaultValue="Diabetes"
                />
              </label>
              <br></br>
              <label>
                Allergies: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="allergies"
                  defaultValue="Peanuts, Dairy, Wheat"
                />
              </label>
              <br></br>
              <label>
                Medication Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="medicationName"
                  defaultValue="Insulin Glargine"
                />
              </label>
              <br></br>
              <label>
                Medication Dosage:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="medicationDosage"
                  defaultValue="Varies; typically 10 to 20 units per day, adjusted based on blood glucose levels."
                />
              </label>
              <br></br>
              <label>
                Medication Frequency: &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="medicationFrequency"
                  defaultValue="Injected once daily"
                />
              </label>
              <br></br>
              <br></br>

              <h4>Emergency Contact</h4>
              <br></br>
              <label>
                Name:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="emergencyContact.name"
                  defaultValue="Carla Mae Tuazon"
                />
              </label>
              <br></br>
              <label>
                Relationship: &nbsp;
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  defaultValue="Wife"
                />
              </label>
              <br></br>
              <label>
                Contact No.: &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="emergencyContact.contactNo"
                  defaultValue="09123456789"
                />
              </label>
              <br></br>
              <label>
                Email:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="email"
                  name="emergencyContact.email"
                  defaultValue="mae@gmail.com"
                />
              </label>
              <br></br>
              <label>
                Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="emergencyContact.address"
                  defaultValue="Mandaluyong City"
                />
              </label>

              <div>
                <button type="button" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPatInfo;

/**import { useState } from "react";
import Side from "./dashboard/side";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye, FaUserEdit } from "react-icons/fa";

const ViewPatInfo = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [patientDetails, setPatientDetails] = useState({
    name: "John Martin Sarcia",
    nickname: "Martin",
    age: 22,
    birthdate: "September 2, 2002",
    surgery: "Appendectomy",
    dateOfSurgery: "12/06/2020",
    surgicalOutcome: "Successful",
    chronicIllnesses: "Diabetes",
    allergies: "Peanuts, Dairy, Wheat",
    medicationName: "Insulin Glargine",
    medicationDosage:
      "Varies; typically 10 to 20 units per day, adjusted based on blood glucose levels.",
    medicationFrequency: "Injected once daily",
    emergencyContact: {
      name: "Carla Mae Tuazon",
      relationship: "Wife",
      contactNo: "09123456789",
      email: "mae@gmail.com",
      address: "Mandaluyong City",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("emergencyContact.")) {
      const field = name.split(".")[1];
      setPatientDetails((prev) => ({
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [field]: value },
      }));
    } else {
      setPatientDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const togglePopup = () => {
    4;
    setShowPopup(!showPopup);
  };

  return (
    <div className={showPopup ? "" : ""}>
      <Side />

      <div className="viewcg">
        <a href="/Patients">
          <IoMdArrowRoundBack />
        </a>
        <img src="patient.png" alt="Admin" />
        <h2>Patient Account Details</h2>
        <button onClick={togglePopup}>
          <FaUserEdit className="editcg" />
        </button>
      </div>

      <div className="personalpat">
        <p>
          <b>Name:</b> &nbsp;&nbsp; John Martin Sarcia <br />
          <br />
          <b>Nickname:</b> &nbsp;&nbsp; {patientDetails.nickname} <br />
          <br />
          <b>Age:</b>&nbsp;&nbsp; {patientDetails.age} <br />
          <br />
          <b>Birthdate:</b>&nbsp;&nbsp; {patientDetails.birthdate}
          <br />
          <br />
        </p>
      </div>

      <div className="medhistory">
        <h2>Medical History</h2>
        <h4>Surgical History</h4>
        <div className="medetails">
          <p>
            <b>Surgery:</b> &nbsp;&nbsp; {patientDetails.surgery} <br />
            <br />
            <b>Date of Surgery:</b>&nbsp;&nbsp; {patientDetails.dateOfSurgery}
            <br />
            <br />
            <b>Surgical Outcome:</b>&nbsp;&nbsp;{" "}
            {patientDetails.surgicalOutcome}
            <br />
            <br />
          </p>
        </div>
      </div>

      <div className="medicalConditions">
        <h2>Medical Conditions</h2>
        <h4>Medications</h4>
        <div className="details">
          <p>
            <b>Chronic Illnesses:</b> &nbsp;&nbsp;{" "}
            {patientDetails.chronicIllnesses} <br />
            <br />
            <b>Allergies:</b>&nbsp;&nbsp; {patientDetails.allergies}
            <br />
            <br />
          </p>
          <a>
            <b>Name:</b> &nbsp;&nbsp; {patientDetails.medicationName} <br />
            <br />
            <b>Dosage:</b>&nbsp;&nbsp; {patientDetails.medicationDosage} <br />
            <br />
            <b>Frequency:</b>&nbsp;&nbsp; {patientDetails.medicationFrequency}{" "}
            <br />
            <br />
          </a>
        </div>
      </div>

      <div className="patcontacts">
        <h2>Emergency Contact</h2>
        <p>
          <b>Name:</b> &nbsp;&nbsp; {patientDetails.emergencyContact.name}{" "}
          <br />
          <br />
          <b>Relationship:</b>&nbsp;&nbsp;{" "}
          {patientDetails.emergencyContact.relationship}
          <br />
          <br />
          <b>Contact No.:</b>&nbsp;&nbsp;{" "}
          {patientDetails.emergencyContact.contactNo} <br />
          <br />
          <b>Email:</b>&nbsp;&nbsp; {patientDetails.emergencyContact.email}{" "}
          <br />
          <br />
        </p>
        <a>
          <b>Address:</b> &nbsp;&nbsp; {patientDetails.emergencyContact.address}
        </a>
      </div>

      {showPopup && (
        <div className="popuppat">
          <div className="popuppat-content">
            <h3>Edit Patient Details</h3>
            <form>
              <label>
                <br></br>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="name"
                  value={patientDetails.name}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Nickname: &nbsp;
                <input
                  type="text"
                  name="nickname"
                  value={patientDetails.nickname}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="number"
                  name="age"
                  value={patientDetails.age}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Birthdate:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  name="birthdate"
                  value={patientDetails.birthdate}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <br></br>
              <h4>Surgical History</h4>
              <label>
                <br></br>
                Surgery: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="surgery"
                  value={patientDetails.surgery}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Date of Surgery: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  name="dateOfSurgery"
                  value={patientDetails.dateOfSurgery}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Surgical Outcome: &nbsp;&nbsp;
                <input
                  type="text"
                  name="surgicalOutcome"
                  value={patientDetails.surgicalOutcome}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <br></br>

              <h4>Medications</h4>
              <br></br>
              <label>
                Chronic Illnesses: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="chronicIllnesses"
                  value={patientDetails.chronicIllnesses}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Allergies: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="allergies"
                  value={patientDetails.allergies}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Medication Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="medicationName"
                  value={patientDetails.medicationName}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Medication Dosage:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="medicationDosage"
                  value={patientDetails.medicationDosage}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Medication Frequency: &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="medicationFrequency"
                  value={patientDetails.medicationFrequency}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <br></br>

              <h4>Emergency Contact</h4>
              <br></br>
              <label>
                Name:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={patientDetails.emergencyContact.name}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Relationship: &nbsp;
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={patientDetails.emergencyContact.relationship}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Contact No.: &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="emergencyContact.contactNo"
                  value={patientDetails.emergencyContact.contactNo}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Email:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="email"
                  name="emergencyContact.email"
                  value={patientDetails.emergencyContact.email}
                  onChange={handleChange}
                />
              </label>
              <br></br>
              <label>
                Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  name="emergencyContact.address"
                  value={patientDetails.emergencyContact.address}
                  onChange={handleChange}
                />
              </label>

              <div>
                <button type="button" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPatInfo;
 */
