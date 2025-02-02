import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./CSS/BuilderUpload.css";

const BuilderUpload = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const [formData, setFormData] = useState({
    email: email || "",
    contactNumber: "",
    address: "",
    society_name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/builder-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Building uploaded successfully!");
        navigate(`/builder-dashboard/${email}`);
      })
      .catch((err) => console.error("Upload error:", err));
  };

  return (
    <div className="upload-container">
      <h2>Upload Building</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={formData.email} disabled />

        <label>Contact Number:</label>
        <input type="text" name="contactNumber" onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="address" onChange={handleChange} required />

        <label>Society Name:</label>
        <input type="text" name="society_name" onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" onChange={handleChange} required></textarea>

        <label>Image URL:</label>
        <input type="text" name="image" onChange={handleChange} />

        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
};

export default BuilderUpload;
