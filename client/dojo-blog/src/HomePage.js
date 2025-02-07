// // HomePage.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./CSS/HomePage.css"

// const HomePage = () => {
//   const [buildings, setBuildings] = useState([]);

//   useEffect(() => {
//     const fetchBuildings = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/builder-upload");
//         setBuildings(response.data);
//       } catch (error) {
//         console.error("Error fetching buildings:", error);
//       }
//     };
//     fetchBuildings();
//   }, []);

//   return (
//     <div className="home-container">
//       <h1>Verified Societies</h1>
//       <div className="buildings-grid">
//         {buildings.length === 0 ? (
//           <p>No verified societies available.</p>
//         ) : (
//           buildings.map((building) => (
//             <div key={building._id} className="building-card">
//               <img src={building.image} alt={building.society_name} />
//               <h3>{building.society_name}</h3>
//               <p><strong>Email:</strong> {building.email}</p>
//               <p><strong>Contact:</strong> {building.contactNumber}</p>
//               <p><strong>Address:</strong> {building.address}</p>
//               <p><strong>Description:</strong> {building.description}</p>

//               <div className="button-container">
//                 <Link to={`/user/${building._id}`} className="explore-btn">
//                   Explore
//                 </Link>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CSS/HomePage.css";

const HomePage = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/builder-upload");
        setBuildings(response.data);
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };
    fetchBuildings();
  }, []);

  return (
    <div className="home-container">
      <h1>Verified Societies</h1>
      <div className="buildings-grid">
        {buildings.length === 0 ? (
          <p>No verified societies available.</p>
        ) : (
          buildings.map((building) => (
            <div key={building._id} className="building-card">
              <img src={building.image} alt={building.society_name} />
              <h3>{building.society_name}</h3>
              <p><strong>Address:</strong> {building.address}</p>

              <div className="button-container">
                <Link to={`/user/${building._id}`} className="explore-btn">
                  Explore
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;

