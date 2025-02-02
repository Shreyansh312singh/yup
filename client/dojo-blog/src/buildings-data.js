import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Building_data.css";

const BuildingsData = () => {
  const [buildings, setBuildings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await fetch("http://localhost:5000/builder-upload");
        const data = await response.json();
        if (Array.isArray(data)) {
          setBuildings(data);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchBuildings();
  }, []);

  const handleVerifyClick = (buildingId) => {
   // export const myConstant = 42;
    navigate(`/verify-building/${buildingId}`);
  };

  return (
    <div className="buildings-container">
      <h2>Buildings Data</h2>
      <div className="buildings-grid">
      {buildings
  .filter((building) => !building.verify) // Filter unverified buildings
  .map((building) => (
    <div key={building._id} className="building-card">
      <p><strong>Email:</strong> {building.email}</p>
      <p><strong>Contact:</strong> {building.contactNumber}</p>
      <p><strong>Address:</strong> {building.address}</p>
      <p><strong>Society Name:</strong> {building.society_name}</p>
      <p><strong>Description:</strong> {building.description}</p>
      {building.image && <img src={building.image} alt="Building" className="building-image" />}
      <p>
        <strong>Verification Status:</strong> 
        <span className="pending">Pending</span>
      </p>
      <button className="verify-button" onClick={() => handleVerifyClick(building._id)}>
        Verify
      </button>
    </div>
))}
      </div>
    </div>
  );
};

export default BuildingsData;
