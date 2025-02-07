// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// import "./index.css";

// const BuilderLogin = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/builder-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Redirect to builder's dashboard with email
//         navigate(`/builder-dashboard/${formData.email}`);
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className="builder-form">
//       <h2>Builder Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default BuilderLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const BuilderLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/api/builder-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Store authentication info
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("builderEmail", formData.email);

        // ✅ Redirect to dashboard
        navigate(`/builder-dashboard/${formData.email}`);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="builder-form">
      <h2>Builder Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* 🚨 Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BuilderLogin;
