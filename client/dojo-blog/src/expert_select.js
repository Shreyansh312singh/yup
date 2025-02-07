// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ExpertSelect = () => {
//   const [builders, setBuilders] = useState([]);

//   useEffect(() => {
//     const fetchBuilders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products");
//         setBuilders(response.data);
//       } catch (error) {
//         console.error("Error fetching builder details", error);
//       }
//     };

//     fetchBuilders();
//   }, []);

//   return (
//     <div className="expert-container">
//       <h2>Builder Details</h2>
//       <ul>
//         {builders.map((builder, index) => (
//           <li key={index} className="builder-card">
//             <h3>{builder.builder_name}</h3>
//             <p>Society: {builder.society_name}</p>
//             <p>Price per sq. ft.: ₹{builder.Square_footprice}</p>
//             <p>Location: {builder.location}</p>
//             {builder.image && <img src={`http://localhost:5000/${builder.image}`} alt="Builder" />}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExpertSelect;


import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpertSelect = () => {
  const [builders, setBuilders] = useState([]);

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setBuilders(response.data);
      } catch (error) {
        console.error("Error fetching builder details", error);
      }
    };

    fetchBuilders();
  }, []);

  return (
    <div className="expert-container">
      <h2>Builder Details</h2>
      <ul>
        {builders.map((builder, index) => (
          <li key={index} className="builder-card">
            <h3>{builder.builderName}</h3>
            <p>Society: {builder.society_name}</p>
            <p>Price per sq. ft.: ₹{builder.perSquareFootPrice}</p>
            <p>Total Area: {builder.totalArea} sq. ft.</p>
            <p>Construction Year: {builder.constructionYear}</p>
            <p>Property Age: {builder.propertyAge} years</p>
            <p>Location: {builder.location.latitude}, {builder.location.longitude}</p>
            {builder.image && <img src={`http://localhost:5000/${builder.image}`} alt="Builder" />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertSelect;

