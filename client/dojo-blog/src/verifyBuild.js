// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./CSS/varifyBuild.css";

// const VerifyBuilding = () => {
//   const { buildingId } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [building, setBuilding] = useState(null);
//   const [formData, setFormData] = useState({
//     five_year_return: "",
//     one_year_return: "",
//     x_coordinate: "",
//     y_coordinate: "",
//     property_age: "",
//     area_dev_rate: "",
//     square_foot_price: "",
//     facilities_rate: "",
//   });

//   useEffect(() => {
//     const fetchBuilding = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/builder-upload/${buildingId}`);
//         const data = await response.json();
//         setBuilding(data);

//         if (data.email) {
//           const profileResponse = await fetch(`http://localhost:5000/api/builder-signup/${data.email}`);
//           const profileData = await profileResponse.json();
//           setProfile(profileData);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchBuilding();
//   }, [buildingId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleConfirm = () => {
//     console.log("Confirmed Data:", formData);
//   };

//   return (
//     <div className="verify-container">
//       <div className="profile-section">
//         <h2>Builder Profile</h2>
//         {profile ? (
//           <div>
//             <p><strong>Name:</strong> {profile.builderName}</p>
//             <p><strong>Company:</strong> {profile.companyName}</p>
//             <p><strong>Email:</strong> {profile.email}</p>
//             <p><strong>Contact:</strong> {profile.contactNumber}</p>
//           </div>
//         ) : (
//           <p>Loading profile...</p>
//         )}
//       </div>
      
//       <div className="building-section">
//         <h2>Building Details</h2>
//         {building ? (
//           <div>
//             <p><strong>Email:</strong> {building.email}</p>
//             <p><strong>Contact:</strong> {building.contactNumber}</p>
//             <p><strong>Address:</strong> {building.address}</p>
//             <p><strong>Society Name:</strong> {building.society_name}</p>
//             <p><strong>Description:</strong> {building.description}</p>
//             <p><strong>Verification Status:</strong> {building.verify ? "Confirmed" : "Pending"}</p>
//             <img src={building.image} alt="Building" className="building-image" />
//           </div>
//         ) : (
//           <p>Loading building details...</p>
//         )}
//       </div>

//       <div className="additional-info">
//         <h2>Additional Information</h2>
//         {Object.keys(formData).map((key) => (
//           <div key={key}>
//             <label><strong>{key.replace(/_/g, ' ')}:</strong></label>
//             <input 
//               type="text" 
//               name={key} 
//               value={formData[key]} 
//               onChange={handleChange} 
//             />
//           </div>
//         ))}
//       </div>
      
//       <button onClick={handleConfirm}>Confirm</button>
//     </div>
//   );
// };

// export default VerifyBuilding;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CSS/varifyBuild.css";

const VerifyBuilding = () => {
  const { buildingId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [building, setBuilding] = useState(null);
  const [formData, setFormData] = useState({
    five_year_return: "",
    one_year_return: "",
    x_coordinate: "",
    y_coordinate: "",
    property_age: "",
    area_dev_rate: "",
    square_foot_price: "",
    facilities_rate: "",
  });

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await fetch(`http://localhost:5000/builder/${buildingId}`);
        const data = await response.json();
        setBuilding(data);

        if (data.email) {

          const profileResponse = await fetch(`http://localhost:5000/api/builder-signup/${data.email}`);
          const profileData = await profileResponse.json();
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBuilding();
  }, [buildingId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    try {
      // 1. Update verification status to Confirmed
      await fetch(`http://localhost:5000/builder-upload/${buildingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verify: true }),
      });

      // 2. Post form data to /api/realestate
      await fetch("http://localhost:5000/api/realestate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildingId, ...formData }),
      });

      // 3. Redirect to building-data page
      navigate("/buildings-data");
    } catch (error) {
      console.error("Error confirming data:", error);
    }
  };

  return (
    <div className="verify-container">
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

      <div className="building-section">
        <h2>Building Details</h2>
        {building ? (
          <div>
            <p><strong>Email:</strong> {building.email}</p>
            <p><strong>Contact:</strong> {building.contactNumber}</p>
            <p><strong>Address:</strong> {building.address}</p>
            <p><strong>Society Name:</strong> {building.society_name}</p>
            <p><strong>Description:</strong> {building.description}</p>
            <p><strong>Verification Status:</strong> {building.verify ? "Confirmed" : "Pending"}</p>
            <img src={building.image} alt="Building" className="building-image" />
          </div>
        ) : (
          <p>Loading building details...</p>
        )}
      </div>

      <div className="additional-info">
        <h2>Additional Information</h2>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label><strong>{key.replace(/_/g, ' ')}:</strong></label>
            <input 
              type="text" 
              name={key} 
              value={formData[key]} 
              onChange={handleChange} 
            />
          </div>
        ))}
      </div>

      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default VerifyBuilding;
