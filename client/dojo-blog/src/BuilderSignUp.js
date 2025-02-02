import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./CSS/BuilderSignUp.css";

const BuilderSignUp = () => {
  const [formData, setFormData] = useState({
    builderName: "",
    companyName: "",
    email: "",
    password: "",
    contactNumber: "",
    registrationNumber: "",
  });

  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      // Update the URL to point to localhost:5000 for backend requests
      const response = await fetch("http://localhost:5000/api/builder-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login page after successful sign-up
        console.log("Sign-up successful:", data.message);
        navigate("/builder-login");
      } else {
        console.error("Error during sign-up:", data.message);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="builder-form">
      <h2>Builder Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="builderName"
          placeholder="Builder Name"
          value={formData.builderName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
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
        <input
          type="tel"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="registrationNumber"
          placeholder="Company Registration Number"
          value={formData.registrationNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default BuilderSignUp;
