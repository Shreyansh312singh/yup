import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CSS/BuilderDashBoard.css";

const BuilderDashboard = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/builder-signup/${email}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Error fetching profile:", err));

      fetch(`http://localhost:5000/builder-upload/${email}`)
      .then((res) => res.json())
      .then((data) => {
          console.log("Fetched buildings:", data);
          setBuildings(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching buildings:", err));
  
  }, [email]);

  const handleUploadClick = () => {
    navigate(`/builder-upload?email=${email}`);
  };

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <h2>Builder Profile</h2>
        {profile ? (
          <div>
            <p><strong>Name:</strong> {profile.builderName}</p>
            <p><strong>Company:</strong> {profile.companyName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Contact:</strong> {profile.contactNumber}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      
      <div className="buildings-section">
        <h2>Uploaded Buildings</h2>
        {buildings.length > 0 ? (
          buildings.map((building, index) => (
            <div key={index} className="building-card">
              <p><strong>Email:</strong> {building.email}</p>
              <p><strong>Contact:</strong> {building.contactNumber}</p>
              <p><strong>Address:</strong> {building.address}</p>
              <p><strong>Society Name:</strong> {building.society_name}</p>
              <p><strong>Description:</strong> {building.description}</p>
              <p>
                <strong>Verification Status:</strong> 
                <span className={building.verify ? "verified" : "pending"}>
                  {building.verify ? "Confirmed" : "Pending"}
                </span>
              </p>
              <img src={building.image} alt="Building" className="building-image" />
            </div>
          ))
        ) : (
          <p>No buildings uploaded yet.</p>
        )}
      </div>

      <button className="upload-button" onClick={handleUploadClick}>
        Upload Building
      </button>
    </div>
  );
};

export default BuilderDashboard;
