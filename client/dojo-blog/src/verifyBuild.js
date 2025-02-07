

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./CSS/varifyBuild.css";

// const VerifyBuilding = () => {
//   const { buildingId } = useParams();
//   const navigate = useNavigate();
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
//         const response = await fetch(`http://localhost:5000/builder/${buildingId}`);
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

//   const handleConfirm = async () => {
//     try {
//       // 1. Update verification status to Confirmed
//       await fetch(`http://localhost:5000/builder-upload/${buildingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ verify: true }),
//       });

//       // 2. Post form data to /api/realestate
//       await fetch("http://localhost:5000/api/realestate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ buildingId, ...formData }),
//       });

//       // 3. Redirect to building-data page
//       navigate("/buildings-data");
//     } catch (error) {
//       console.error("Error confirming data:", error);
//     }
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

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./CSS/varifyBuild.css";

// const VerifyBuilding = () => {
//   const { buildingId } = useParams();
//   const navigate = useNavigate();
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
//         const response = await fetch(`http://localhost:5000/builder/${buildingId}`);
//         const data = await response.json();
//         setBuilding(data);

//         // Redirect if already verified
//         if (data.verify) {
//           navigate("/buildings-data", { replace: true });
//         }

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
//   }, [buildingId, navigate]);

//   // Prevent back button access
//   useEffect(() => {
//     const handlePopState = () => {
//       if (building?.verify) {
//         navigate("/buildings-data", { replace: true });
//       }
//     };

//     window.addEventListener("popstate", handlePopState);
//     return () => window.removeEventListener("popstate", handlePopState);
//   }, [building, navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleConfirm = async () => {
//     try {
//       await fetch(`http://localhost:5000/builder-upload/${buildingId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ verify: true }),
//       });

//       await fetch("http://localhost:5000/api/realestate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ buildingId, ...formData }),
//       });

//       navigate("/buildings-data", { replace: true });
//     } catch (error) {
//       console.error("Error confirming data:", error);
//     }
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
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    five_year_return: "",
    one_year_return: "",
    builder_rating: "",
    area_dev_rate: "",
    facilities_rate: "",
  });

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await fetch(`http://localhost:5000/builder/${buildingId}`);

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        setBuilding(data);

        if (data.verify) navigate("/buildings-data", { replace: true });

        if (data.email) {
          const profileResponse = await fetch(`http://localhost:5000/api/builder-signup/${data.email}`);
          const profileData = await profileResponse.json();
          setProfile(profileData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBuilding();
  }, [buildingId, navigate]);

  useEffect(() => {
    const handlePopState = () => {
      if (building?.verify) {
        navigate("/buildings-data", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [building, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    try {
      await fetch(`http://localhost:5000/builder-upload/${buildingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verify: true }),
      });

      await fetch("http://localhost:5000/api/realestate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buildingId, ...formData }),
      });

      navigate("/buildings-data", { replace: true });
    } catch (error) {
      console.error("Error confirming data:", error);
    }
  };

  if (error) {
    return (
      <div className="error-message">
        <h2>Access Denied</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/buildings-data")}>Go Back</button>
      </div>
    );
  }

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
            <p><strong>Price per SqFt:</strong> {building.perSquareFootPrice}</p>
            <p><strong>Total Area:</strong> {building.totalArea} sqft</p>
            <p><strong>Construction Year:</strong> {building.constructionYear}</p>
            <p><strong>Property Age:</strong> {building.propertyAge} years</p>
            <p><strong>Amenities:</strong> {building.amenities}</p>
            <p><strong>Builder Name:</strong> {building.builderName}</p>
            <p><strong>Price 2BHK:</strong> {building.price2BHK}</p>
            <p><strong>Price 3BHK:</strong> {building.price3BHK}</p>
            <p><strong>Latitude:</strong> {building.latitude}</p>
            <p><strong>Longitude:</strong> {building.longitude}</p>
            <p><strong>Verification Status:</strong> {building.verify ? "Confirmed" : "Pending"}</p>
            <img src={building.image} alt="Building" className="building-image" />
          </div>
        ) : (
          <p>Loading building details...</p>
        )}
      </div>

      <div className="additional-info">
        <h2>Additional Information</h2>
        <div className="input-group">
          <label><strong>5-Year Return (%):</strong></label>
          <input type="number" name="five_year_return" value={formData.five_year_return} onChange={handleChange} required />
        </div>
        
        <div className="input-group">
          <label><strong>1-Year Return (%):</strong></label>
          <input type="number" name="one_year_return" value={formData.one_year_return} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label><strong>Builder Rating (out of 5):</strong></label>
          <input type="number" name="builder_rating" value={formData.builder_rating} onChange={handleChange} required min="1" max="5" />
        </div>

        <div className="input-group">
          <label><strong>Area Development Rate:</strong></label>
          <input type="number" name="area_dev_rate" value={formData.area_dev_rate} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label><strong>Facilities Rate:</strong></label>
          <input type="number" name="facilities_rate" value={formData.facilities_rate} onChange={handleChange} required />
        </div>
      </div>

      <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default VerifyBuilding;
