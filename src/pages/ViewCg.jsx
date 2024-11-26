import { useState, useEffect } from "react";
import Side from "./dashboard/side";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye, FaUserEdit } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom"; // Import useParams

const ViewCg = () => {
  const { id } = useParams();
  const [caregivers, setCaregiver] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5672/api/caregivers");
        const data = await response.json();
        setCaregiver(data[0]); //when change the inputs corresponds to the id
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted.");
    handleClosePopup();
  };

  return (
    <div>
      <Side />

      <div className={`viewcg ${isEditing ? "blurred" : ""}`}>
        <a href="/Caregivers">
          <IoMdArrowRoundBack />
        </a>
        <img src="adminriza.png" />
        <h2>Account Details</h2>
        <button onClick={handleEditClick}>
          <FaUserEdit className="editcg" />
        </button>
      </div>

      {caregivers?.id && (
        <>
          <div className="accountdetails">
            <h6>ID: {caregivers.id} </h6>
            <p>
              <b>Username:</b> &nbsp; {caregivers.cgauser}
              <br />
              <br />
              <b>Password:</b> &nbsp;{" "}
              {showPassword ? caregivers.cgapass : "*****"}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="showpass" onClick={togglePassword}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </p>
          </div>

          <div className="personal">
            <h2>Personal Details</h2>
            <p>
              <b>Name:</b> &nbsp;&nbsp; {caregivers.firstname} <br />
              <br />
              <b>Birthdate:</b>&nbsp;&nbsp; {caregivers.birth}
              <br />
              <br />
              <b>Gender:</b>&nbsp;&nbsp; {caregivers.gender} <br />
              <br />
              <b>Age:</b>&nbsp;&nbsp; {caregivers.age} <br />
              <br />
            </p>
            <a>
              <b>Contact No.:</b> &nbsp;&nbsp; {caregivers.contact} <br />
              <br />
              <b>Email:</b>&nbsp;&nbsp; {caregivers.email}
              <br />
              <br />
              <b>Address:</b>&nbsp;&nbsp; {caregivers.street}
              <br />
              <br />
            </a>
          </div>

          <div className="employment">
            <h2>Employment Details</h2>
            <p>
              <b>Years of Experience:</b> &nbsp;&nbsp; {caregivers.exp} <br />
              <br />
              <b>Availability:</b>&nbsp;&nbsp; {caregivers.availability}
              <br />
              <br />
              <b>Preferred work hours:</b>&nbsp;&nbsp; {caregivers.workhours}{" "}
              <br />
              <br />
            </p>
            <a>
              <b>CPR/First Aid Certification:</b> &nbsp;&nbsp; {caregivers.cpr}{" "}
              <br />
              <br />
            </a>
          </div>

          <div className="contacts">
            <h2>Emergency Contact</h2>
            <p>
              <b>Name:</b> &nbsp;&nbsp; {caregivers.ecfirst} <br />
              <br />
              <b>Relationship:</b>&nbsp;&nbsp; {caregivers.ecrel}
              <br />
              <br />
              <b>Contact No.:</b>&nbsp;&nbsp; {caregivers.ecnum} <br />
              <br />
              <b>Email:</b>&nbsp;&nbsp; {caregivers.ecemail} <br />
              <br />
            </p>
            <a>
              <b>Address:</b> &nbsp;&nbsp; {caregivers.ecst}
            </a>
          </div>
        </>
      )}

      {isEditing && (
        <div className="popupcg">
          <div className="popupcg-content">
            <IoMdCloseCircleOutline
              onClick={handleClosePopup}
              className="editclose"
            />
            <h3>Edit Caregiver Details</h3>
            <br />
            <form onSubmit={handleSubmit}>
              <h4>Account Details</h4>
              <br />
              <label>
                Username: &nbsp;
                <input type="text" defaultValue={caregivers.cgauser} />
              </label>
              <br />
              <br />
              <label>
                Password: &nbsp; &nbsp;
                <input type="text" defaultValue={caregivers.cgapass} />
              </label>
              <br />
              <br />
              <h4>Personal Details</h4>
              <br />
              <label>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.firstname} />
              </label>
              <br />
              <br />
              <label>
                Birthdate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.birth} />
              </label>
              <br />
              <br />
              <label>
                Gender:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.gender} />
              </label>
              <br />
              <br />
              <label>
                Age:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.age} />
              </label>
              <br />
              <br />
              <label>
                Contact No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.contact} />
              </label>
              <br />
              <br />
              <label>
                Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.email} />
              </label>
              <br />
              <br />
              <label>
                Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.street} />
              </label>
              <br />
              <br />
              <h4>Employment Details</h4>
              <br />
              <label>
                Years of Experience:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.exp} />
              </label>
              <br />
              <br />
              <label>
                Availability:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.availability} />
              </label>
              <br />
              <br />
              <label>
                Preferred Work Hours:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.workhours} />
              </label>
              <br />
              <br />
              <label>
                CPR Certification:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.cpr} />
              </label>
              <br />
              <br />
              <h4>Emergency Contact</h4>
              <br />
              <label>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecfirst} />
              </label>
              <br />
              <br />
              <label>
                Relationship:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecrel} />
              </label>
              <br />
              <br />
              <label>
                Contact No:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecnum} />
              </label>
              <br />
              <br />
              <label>
                Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecemail} />
              </label>
              <br />
              <br />
              <label>
                Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" defaultValue={caregivers.ecst} />
              </label>
              <br />
              <br />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCg;

/** const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3308/api/caregivers");
      const data = await response.json();
      setCaregiver(data[0]); //when change the inputs corresponds to the id
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); */

/**  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3308/api/caregivers");
      const data = await response.json();
      setCaregiver(data[0]); //when change the inputs corresponds to the id
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [id]); */
