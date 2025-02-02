import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/expertLogin.css";

const ExpertLogin = () => {
  const [formData, setFormData] = useState({
    expert_id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/expert-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to buildings-data page after successful login
        navigate("/buildings-data");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Expert Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="expert_id"
          placeholder="Expert ID"
          value={formData.expert_id}
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

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ExpertLogin;
