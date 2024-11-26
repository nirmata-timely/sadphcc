import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Side from "./dashboard/side";
import axios from "axios";

const CreateElderProfile = () => {
  const [newfirstname, setnewfirstname] = useState("");
  const [newmiddlename, setnewmiddlename] = useState("");
  const [newlastname, setnewlastname] = useState("");
  const [newpreferredname, setnewpreferredname] = useState("");
  const [newage, setnewage] = useState(0);
  const [newdateofbirth, setnewdateofbirth] = useState("");
  const [newgender, setnewgender] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [newchronicillness, setnewchronicillness] = useState("");
  const [newallergies, setnewallergies] = useState("");
  const [newmedname, setnewmedname] = useState("");
  const [newmeddosage, setnewmeddosage] = useState("");
  const [newmedfreq, setnewmedfreq] = useState("");
  const [newsurgeryname, setnewsurgeryname] = useState("");
  const [newdateofsurgery, setnewdateofsurgery] = useState("");
  const [newsurgicaloutcome, setnewsurgicaloutcome] = useState("");
  const [newecfirstname, setnewecfirstname] = useState("");
  const [newecmiddlename, setnewecmiddlename] = useState("");
  const [neweclastname, setneweclastname] = useState("");
  const [newecrelationship, setnewecrelationship] = useState("");
  const [neweccontact, setneweccontact] = useState("");
  const [newecemail, setnewecemail] = useState("");
  const [newecstreet, setnewecstreet] = useState("");
  const [newecbarangay, setnewecbarangay] = useState("");
  const [neweccity, setneweccity] = useState("");
  const [newecprovince, setnewecprovince] = useState("");
  const [neweccountry, setneweccountry] = useState("");
  const [newEeczip, setneweczip] = useState("");
  const [newroomno, setnewroomno] = useState("");
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
          context.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw image to canvas
          console.log("Image uploaded successfully:", file.name); // Log the image name
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setImageFile(file); // Set image file to state
    } else {
      console.log("No image file selected."); // Log if no file is selected
    }
  };

  const navigate = useNavigate();

  const onSubmitElderAcct = async () => {
    const patientsData = {
      first_name: newfirstname,
      middle_name: newmiddlename,
      last_name: newlastname,
      preferred_name: newpreferredname,
      age: newage,
      date_of_birth: newdateofbirth,
      gender: selectedGender,
      chronic_illnesses: newchronicillness,
      allergies: newallergies,
      medication_name: newmedname,
      medication_dosage: newmeddosage,
      medication_frequency: newmedfreq,
      surgery_name: newsurgeryname,
      date_of_surgery: newdateofsurgery,
      surgical_outcome: newsurgicaloutcome,
      ec_first_name: newecfirstname,
      ec_middle_name: newecmiddlename,
      ec_last_name: neweclastname,
      ec_relationship: newecrelationship,
      ec_contact_number: neweccontact,
      ec_email: newecemail,
      ec_street: newecstreet,
      ec_barangay: newecbarangay,
      ec_city: neweccity,
      ec_province: newecprovince,
      ec_country: neweccountry,
      ec_zip: newEeczip,
      room_no: newroomno,
      profile_picture: imageFile,
    };

    console.log("Patients Data:", patientsData);

    try {
      const response = await fetch("http://localhost:5124/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientsData),
      });

      if (response.ok) {
        // Log the activity after successful creation
        const username = localStorage.getItem("username");
        const logData = {
          username: username,
          activityType: `Patient profile created`,
          timestamp: new Date().toISOString(),
        };

        await axios.post("http://localhost:5124/api/logs", logData);

        alert("Account Successfully Created!");
        navigate("/Patients");
      } else {
        const errorResponse = await response.json();
        console.error("Error response:", errorResponse);
        alert(errorResponse.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Account creation error:", error);

      if (error.response) {
        console.error("Server error:", error.response.data);
        alert("Account creation failed. Please try again later.");
      } else if (error.request) {
        console.error("Network error:", error.request);
        alert(
          "There was a network error. Please check your internet connection."
        );
      } else {
        console.error("Other error:", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  // Function to format the contact number
  const formatContactNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // Format the number according to the specified pattern
    if (digits.length <= 3) return `${digits}`; // For 3 digits
    if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`; // For 3 digits followed by 4 digits
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`; // For 3 digits 4 digits 4 digits
  };

  return (
    <div>
      <div className="">
        <Side />
        <div className="dcontainer">
          <div className="cecontainer">
            <p className="ceep">Patient Profile</p>
            <p className="cetext">
              This contains Personal Information of the Patient.
            </p>
            <img src="patient.png" className="addcgr" />
            <hr className="cedivider1" />

            <p className="ename">Personal Information</p>

            <p className="ename1">Name</p>
            <p className="efname1">First Name:</p>
            <input
              class="inputef"
              type="text"
              placeholder="Firstname"
              autoFocus
              value={newfirstname}
              onChange={(e) => setnewfirstname(e.target.value)}
            />

            <p className="emname">Middle Name:</p>
            <input
              class="inputmn"
              type="text"
              placeholder="Middlename"
              value={newmiddlename}
              onChange={(e) => setnewmiddlename(e.target.value)}
            />

            <p className="elname">Last Name:</p>
            <input
              class="inputl"
              type="text"
              placeholder="Lastname"
              value={newlastname}
              onChange={(e) => setnewlastname(e.target.value)}
            />

            <p className="prefn">Nickname:</p>
            <input
              class="inputprefn"
              type="text"
              placeholder="Nickname"
              value={newpreferredname}
              onChange={(e) => setnewpreferredname(e.target.value)}
            />

            <p className="cebd">Age:</p>
            <input
              class="ceinputbd"
              type="number"
              placeholder="Age"
              value={newage}
              onChange={(e) => setnewage(e.target.value)}
            />

            <p className=" eage">Date of Birth:</p>
            <input
              className="inputeage"
              type="date"
              placeholder="mm/dd/yyyy"
              value={newdateofbirth}
              onChange={(e) => {
                setnewdateofbirth(e.target.value);
                // Calculate age based on the date of birth
                const dob = new Date(e.target.value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                if (
                  monthDiff < 0 ||
                  (monthDiff === 0 && today.getDate() < dob.getDate())
                ) {
                  setnewage(age - 1);
                } else {
                  setnewage(age);
                }
              }}
            />

            <p className="cegd">Gender:</p>

            <input
              className="cemrb"
              type="radio"
              value="male"
              checked={selectedGender === "male"}
              onChange={handleGenderChange}
            />
            <p className="cem">Male</p>

            <input
              className="cefmrb"
              type="radio"
              value="female"
              checked={selectedGender === "female"}
              onChange={handleGenderChange}
            />
            <p className="cefm">Female</p>

            <hr className="cedivider2" />

            <p className="medinfo">Medical Information</p>
            <p className="medtext">
              This contains Medical Information of the Elderly.
            </p>

            <p className="medicalcon">Medical Conditions </p>
            <p className="medchro">Chronic Illnesses:</p>
            <input
              class="inputmedchro"
              type="text"
              placeholder="Chronic Illness"
              value={newchronicillness}
              onChange={(e) => setnewchronicillness(e.target.value)}
            />

            <p className="medall">Allergies:</p>
            <input
              class="inputmedall"
              type="text"
              placeholder="Allegies"
              value={newallergies}
              onChange={(e) => setnewallergies(e.target.value)}
            />

            <p className="medc">Medications</p>
            <p className="medcnm">Name:</p>
            <input
              class="inputmedcnm"
              type="text"
              placeholder="Medication"
              value={newmedname}
              onChange={(e) => setnewmedname(e.target.value)}
            />
            <p className="meddos">Dosage:</p>
            <input
              className="inputmeddos"
              type="text"
              placeholder="0mg"
              value={newmeddosage}
              onChange={(e) => setnewmeddosage(e.target.value)}
            />
            <p className="medfreq">Frequency:</p>
            <input
              className="inputmedfreq"
              type="text"
              placeholder="0x a day"
              value={newmedfreq}
              onChange={(e) => setnewmedfreq(e.target.value)}
            />

            <p className="medsh">Surgical History</p>
            <p className="medshtext">
              *This is Optional. If no surgery performed input NONE and date
              today.
            </p>
            <p className="medsm">Surgery Name:</p>
            <input
              className="inputmedsm"
              type="text"
              placeholder="Surgery"
              value={newsurgeryname}
              onChange={(e) => setnewsurgeryname(e.target.value)}
            />
            <p className="meddsurg">Date of Surgery:</p>
            <input
              className="inputmeddsurg"
              type="date"
              placeholder="mm/dd/yyyy"
              value={newdateofsurgery}
              onChange={(e) => setnewdateofsurgery(e.target.value)}
            />

            <p className="medso">Surgical Outcome:</p>
            <input
              class="inputmedso"
              type="text"
              placeholder="Outcome"
              value={newsurgicaloutcome}
              onChange={(e) => setnewsurgicaloutcome(e.target.value)}
            />

            <hr className="medivider3" />

            <p className="eecinfo">Emergency Contact</p>
            <p className="eemtext">
              *This contains Emergency Contact Informations of the Elderly.
            </p>

            <p className="eecpecp">Contact Person </p>
            <p className="eecfn">Name:</p>
            <input
              class="inputeecfn"
              type="text"
              placeholder="Firstname"
              value={newecfirstname}
              onChange={(e) => setnewecfirstname(e.target.value)}
            />
            <input
              class="inputeecmn"
              type="text"
              placeholder="Middlename"
              value={newecmiddlename}
              onChange={(e) => setnewecmiddlename(e.target.value)}
            />
            <input
              class="inputeecln"
              type="text"
              placeholder="Lastname"
              value={neweclastname}
              onChange={(e) => setneweclastname(e.target.value)}
              e
            />

            <p className="ers">Relationship:</p>
            <input
              class="inputers"
              type="text"
              placeholder="Relationship"
              value={newecrelationship}
              onChange={(e) => setnewecrelationship(e.target.value)}
            />

            <p className="eecpn">Contact No#:</p>
            <input
              class="inputeecpn"
              type="text"
              placeholder="+63 912 345 6789"
              value={neweccontact}
              onChange={(e) => {
                const formattedValue = formatContactNumber(e.target.value);
                setneweccontact(formattedValue);
              }}
              maxLength={13} // Adjusted to accommodate the formatted length
            />

            <p className="eecemAdd">Email Adress:</p>
            <input
              class="inputeecemAdd"
              type="text"
              placeholder="username@gmail.com"
              value={newecemail}
              onChange={(e) => setnewecemail(e.target.value)}
            />
            <p className="eecAdd">Address:</p>
            <input
              class="inputeecSt"
              type="text"
              placeholder="St.,"
              value={newecstreet}
              onChange={(e) => setnewecstreet(e.target.value)}
            />
            <input
              class="inputeecBrgy"
              type="text"
              placeholder="Barangay"
              value={newecbarangay}
              onChange={(e) => setnewecbarangay(e.target.value)}
            />
            <input
              class="inputeecCity"
              type="text"
              placeholder="City"
              value={neweccity}
              onChange={(e) => setneweccity(e.target.value)}
            />
            <input
              class="inputeecProv"
              type="text"
              placeholder="Province"
              value={newecprovince}
              onChange={(e) => setnewecprovince(e.target.value)}
            />
            <input
              class="inputeecCountry"
              type="text"
              placeholder="Country"
              value={neweccountry}
              onChange={(e) => setneweccountry(e.target.value)}
            />
            <input
              class="inputeecZip"
              type="text"
              placeholder="Zip"
              value={newEeczip}
              onChange={(e) => setneweczip(e.target.value)}
            />

            <input
              class="patientroom"
              type="text"
              placeholder="Room #"
              value={newroomno}
              onChange={(e) => {
                const value = e.target.value;
                if (value > 9) {
                  alert("There are only 9 rooms available.");
                } else {
                  setnewroomno(value);
                }
              }}
            />

            <button class="esave" type="submit" onClick={onSubmitElderAcct}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateElderProfile;
