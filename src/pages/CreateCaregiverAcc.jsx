import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Side from "./dashboard/side";

const CreateCaregiverAcc = () => {
  const [newAge, setnewAge] = useState(0);
  const [newAvailability, setnewAvailability] = useState("");
  const [newFIRSTNAME, setnewFIRSTNAME] = useState("");
  const [newMIDDLENAME, setnewMIDDLENAME] = useState("");
  const [newLASTNAME, setnewLASTNAME] = useState("");
  const [newEMAIL, setnewEMAIL] = useState("");
  const [newCONTNUM, setnewCONTNUM] = useState("");
  const [newBRGY, setnewBRGY] = useState("");
  const [newBIRTH, setnewBIRTH] = useState("");
  const [newCITY, setnewCITY] = useState("");
  const [newCOUNTRY, setnewCOUNTRY] = useState("");
  const [newCPR, setnewCPR] = useState("");
  const [newEXP, setnewEXP] = useState(0);
  const [selectedGender, setSelectedGender] = useState("");
  const [newPROVINCE, setnewPROVINCE] = useState("");
  const [newSTREET, setnewSTREET] = useState("");
  const [newWORKHOURS, setnewWORKHOURS] = useState(0);
  const [newZIP, setnewZIP] = useState("");
  const [newCGAUSER, setnewCGAUSER] = useState("");
  const [newCGAPASS, setnewCGAPASS] = useState("");
  const [newECBRGY, setnewECBRGY] = useState("");
  const [newECCITY, setnewECCITY] = useState("");
  const [newECCOUNTRY, setnewECCOUNTRY] = useState("");
  const [newECEMAIL, setnewECEMAIL] = useState("");
  const [newECFIRST, setnewECFIRST] = useState("");
  const [newECLAST, setnewECLAST] = useState("");
  const [newECMIDDLE, setnewECMIDDLE] = useState("");
  const [newECNUM, setnewECNUM] = useState("");
  const [newECPROVINCE, setnewECPROVINCE] = useState("");
  const [newECREL, setnewECREL] = useState("");
  const [newECST, setnewECST] = useState("");
  const [newECZIP, setnewECZIP] = useState("");
  const [newroom, setnewroom] = useState(0);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const navigate = useNavigate();
  const onSubmitAcctSet = async () => {
    const username = localStorage.getItem("username");
    if (
      !newFIRSTNAME ||
      !newLASTNAME ||
      !validateEmail(newEMAIL) ||
      newAge <= 0 ||
      newAge > 100 ||
      !newCGAUSER ||
      !newCGAPASS ||
      !newroom
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Password validation
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*]{8,12}$/;
    if (!passwordRequirements.test(newCGAPASS)) {
      alert(
        `Password doesn't meet requirements: 
            - 8-12 characters
            - a lowercase letter
            - one uppercase letter
            - one number
            - one special character`
      );
      return;
    }

    const caregiverData = {
      FIRSTNAME: newFIRSTNAME,
      MIDDLENAME: newMIDDLENAME,
      LASTNAME: newLASTNAME,
      EMAIL: newEMAIL,
      CONTACT: newCONTNUM,
      AGE: newAge,
      AVAILABILITY: newAvailability,
      BRGY: newBRGY,
      CITY: newCITY,
      COUNTRY: newCOUNTRY,
      CPR: newCPR,
      EXP: newEXP,
      GENDER: selectedGender,
      PROVINCE: newPROVINCE,
      STREET: newSTREET,
      WORKHOURS: newWORKHOURS,
      ZIP: newZIP,
      BIRTH: newBIRTH,
      CGAUSER: newCGAUSER,
      CGAPASS: newCGAPASS,
      ECBRGY: newECBRGY,
      ECCITY: newECCITY,
      ECCOUNTRY: newECCOUNTRY,
      ECEMAIL: newECEMAIL,
      ECFIRST: newECFIRST,
      ECLAST: newECLAST,
      ECMIDDLE: newECMIDDLE,
      ECNUM: newECNUM,
      ECPROVINCE: newECPROVINCE,
      ECREL: newECREL,
      ECST: newECST,
      ECZIP: newECZIP,
      room: newroom,
    };

    console.log("Caregiver Data:", caregiverData);

    try {
      const response = await axios.post(
        "http://localhost:5124/caregivers",
        caregiverData
      );

      if (response.status === 200) {
        alert("Account Successfully Created!");

        // Log the activity using the logging API
        const logData = {
          username: username,
          activityType: "Created an account",
          timestamp: new Date().toISOString(),
        };

        await axios.post("http://localhost:5124/api/logs", logData);

        // Send room and first name to api/rooms
        const roomData = {
          room_assigned: newroom,
          firstName: newFIRSTNAME,
        };

        const roomResponse = await axios.post(
          "http://localhost:5124/api/rooms",
          roomData
        );

        if (roomResponse.status === 200) {
          console.log("Room data successfully sent!");
        } else {
          console.error("Error sending room data:", roomResponse.data);
          alert(roomResponse.data.message || "Failed to send room data");
        }

        navigate("/Caregivers");
      } else {
        const errorResponse = response.data;
        console.error("Error response:", errorResponse);
        alert(errorResponse.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Account creation error:", error);
      navigate("/Caregivers");

      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Network error:", error.request);
        alert(
          "There was a network error. Please check your internet connection."
        );
      } else {
        console.error("Other error:", error.message);
      }
    }
  };

  return (
    <div>
      <Side />
      <div className="apcontainer">
        <div className="pcontainer1">
          <p className="ppAcc1">Caregiver Account</p>
          <p className="ptext1">
            This contains Personal Information of the Caregiver
          </p>
          <img src="addcgr.png" className="addcgr" />
          <hr className="pdivider4" />
          <p className="pname1">Personal Information</p>
          <p className="pfname1">Name</p>
          <input
            className="pinputf1"
            type="text"
            placeholder="Firstname"
            autoFocus
            value={newFIRSTNAME}
            onChange={(e) => setnewFIRSTNAME(e.target.value)}
            required
          />

          <p className="pmnname"></p>
          <input
            className="pinputmn"
            type="text"
            placeholder="Middlename"
            value={newMIDDLENAME}
            onChange={(e) => setnewMIDDLENAME(e.target.value)}
          />

          <input
            className="pinputln"
            type="text"
            placeholder="Lastname"
            value={newLASTNAME}
            onChange={(e) => setnewLASTNAME(e.target.value)}
            required
          />

          <p className="page">Age</p>
          <input
            className="pinputage"
            type="number"
            placeholder="Age"
            value={newAge}
            onChange={(e) => setnewAge(e.target.value)}
          />

          <p className="pbd">Date of Birth</p>
          <input
            className="pinputbd"
            type="date"
            value={newBIRTH}
            onChange={(e) => {
              setnewBIRTH(e.target.value);
              // Calculate age based on the date of birth
              const dob = new Date(e.target.value);
              const today = new Date();
              const age = today.getFullYear() - dob.getFullYear();
              const monthDiff = today.getMonth() - dob.getMonth();
              if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < dob.getDate())
              ) {
                setnewAge(age - 1);
              } else {
                setnewAge(age);
              }
            }}
          />

          <p className="pgd">Gender</p>

          <input
            className="mrb"
            type="radio"
            value="male"
            checked={selectedGender === "male"}
            onChange={handleGenderChange}
          />
          <p className="m">Male</p>

          <input
            className="fmrb"
            type="radio"
            value="female"
            checked={selectedGender === "female"}
            onChange={handleGenderChange}
          />
          <p className="fm">Female</p>

          <p className="pAdd">Address</p>
          <input
            className="pinputSt"
            type="text"
            placeholder="St.,"
            value={newSTREET}
            onChange={(e) => setnewSTREET(e.target.value)}
          />
          <input
            className="pinputCity"
            type="text"
            placeholder="City"
            value={newCITY}
            onChange={(e) => setnewCITY(e.target.value)}
          />
          <input
            className="pinputBrgy"
            type="text"
            placeholder="Brgy"
            value={newBRGY}
            onChange={(e) => setnewBRGY(e.target.value)}
          />
          <input
            className="pinputProv"
            type="text"
            placeholder="Province"
            value={newPROVINCE}
            onChange={(e) => setnewPROVINCE(e.target.value)}
          />
          <input
            className="pinputZip"
            type="text"
            placeholder="Zip Code"
            value={newZIP}
            onChange={(e) => setnewZIP(e.target.value)}
          />
          <input
            className="pinputCountry"
            type="text"
            placeholder="Country"
            value={newCOUNTRY}
            onChange={(e) => setnewCOUNTRY(e.target.value)}
          />

          <p className="pcn1">Contact Number</p>
          <input
            className="pinputcn1"
            type="text"
            placeholder="+63 912 345 6789 "
            value={newCONTNUM}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 11) {
                setnewCONTNUM(value);
              }
            }}
            required
          />
          <p className="pem1">Email address</p>
          <input
            className="pinputem1"
            type="text"
            placeholder="username@gmail.com"
            value={newEMAIL}
            onChange={(e) => setnewEMAIL(e.target.value)}
            required
          />

          <hr className="pdivider6" />

          <p className="eminfo">Employment Information</p>
          <p className="emtext">
            *This contains Employment Information of the Caregiver
          </p>
          <p className="years">Years of Experience:</p>
          <input
            className="inputyoe"
            type="text"
            placeholder=""
            value={newEXP}
            onChange={(e) => setnewEXP(e.target.value)}
          />
          <p className="afp">Availability:</p>
          <input
            className="inputafp"
            type="text"
            placeholder="Full-time / Part-time"
            value={newAvailability}
            onChange={(e) => setnewAvailability(e.target.value)}
          />
          <p className="wh">Preferred Work Hours:</p>
          <input
            className="inputwh"
            type="number" // Change to number for numerical input
            placeholder=" "
            value={newWORKHOURS}
            onChange={(e) => setnewWORKHOURS(parseInt(e.target.value))}
          />
          <p className="cat"></p>
          <p className="cpr">CPR/First Aid Certification</p>
          <input
            className="inputcpr"
            type="text"
            placeholder="Yes / No "
            value={newCPR}
            onChange={(e) => setnewCPR(e.target.value)}
          />
          <hr className="pdivider7" />

          <p className="ecinfo">Emergency Contacts</p>

          <p className="ecfn">Name:</p>
          <input
            className="inputecfn"
            type="text"
            placeholder="Firstname"
            value={newECFIRST}
            onChange={(e) => setnewECFIRST(e.target.value)}
          />
          <input
            className="inputecmn"
            type="text"
            placeholder="Middlename"
            value={newECMIDDLE}
            onChange={(e) => setnewECMIDDLE(e.target.value)}
          />
          <input
            className="inputecln"
            type="text"
            placeholder="Lastname"
            value={newECLAST}
            onChange={(e) => setnewECLAST(e.target.value)}
          />

          <p className="rs">Relationship:</p>
          <input
            className="inputrs"
            type="text"
            placeholder="Relationship"
            value={newECREL}
            onChange={(e) => setnewECREL(e.target.value)}
          />

          <p className="pn">Phone Number:</p>
          <input
            className="inputpn"
            type="text"
            placeholder="+63 912 345 6789  "
            value={newECNUM}
            onChange={(e) => setnewECNUM(e.target.value)}
          />
          <p className="emAdd">Email Adress:</p>
          <input
            className="inputemAdd"
            type="text"
            placeholder="username@gmail.com "
            value={newECEMAIL}
            onChange={(e) => setnewECEMAIL(e.target.value)}
          />
          <p className="ecAdd">Address:</p>
          <input
            className="inputecAddSt"
            type="text"
            placeholder="St.,"
            value={newECST}
            onChange={(e) => setnewECST(e.target.value)}
          />
          <input
            className="inputecAddBrgy"
            type="text"
            placeholder="Barangay"
            value={newECBRGY}
            onChange={(e) => setnewECBRGY(e.target.value)}
          />
          <input
            className="inputecAddCity"
            type="text"
            placeholder="City"
            value={newECCITY}
            onChange={(e) => setnewECCITY(e.target.value)}
          />
          <input
            className="inputecAddProv"
            type="text"
            placeholder="Province"
            value={newECPROVINCE}
            onChange={(e) => setnewECPROVINCE(e.target.value)}
          />
          <input
            className="inputecAddZip"
            type="text"
            placeholder="Zip Code"
            value={newECZIP}
            onChange={(e) => setnewECZIP(e.target.value)}
          />
          <input
            className="inputecAddCountry"
            type="text"
            placeholder="Country"
            value={newECCOUNTRY}
            onChange={(e) => setnewECCOUNTRY(e.target.value)}
          />
          <hr className="pdivider8" />
          <p className="ctext">Create Caregiver Account</p>
          <p className="ctext1">
            *This contain Creation of Caregiver's Account.
          </p>
          <img src="addcgr.png" className="ccgr" />
          <p className="cgacc">Account</p>
          <p className="cgun">Username:</p>
          <input
            className="inputcgun"
            type="text"
            placeholder="username@000"
            value={newCGAUSER}
            onChange={(e) => setnewCGAUSER(e.target.value)}
          />
          <p className="cgpw">Password:</p>
          <input
            className="inputcgpw"
            type="text"
            placeholder="password"
            value={newCGAPASS}
            onChange={(e) => setnewCGAPASS(e.target.value)}
          />

          <p className="cgroomass">Room Assignment:</p>
          <input
            className="roomno"
            type="text"
            placeholder="Room #"
            value={newroom}
            onChange={(e) => setnewroom(e.target.value)}
          />

          <button className="cgsave" type="submit" onClick={onSubmitAcctSet}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCaregiverAcc;
