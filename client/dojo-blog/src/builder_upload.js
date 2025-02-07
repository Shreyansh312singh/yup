// import React, { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import "./CSS/BuilderUpload.css";

// const BuilderUpload = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const email = searchParams.get("email");

//   const [formData, setFormData] = useState({
//     email: email || "",
//     contactNumber: "",
//     address: "",
//     society_name: "",
//     description: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("http://localhost:5000/builder-upload", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         alert("Building uploaded successfully!");
//         navigate(`/builder-dashboard/${email}`);
//       })
//       .catch((err) => console.error("Upload error:", err));
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload Building</h2>
//       <form className="upload-form" onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input type="email" value={formData.email} disabled />

//         <label>Contact Number:</label>
//         <input type="text" name="contactNumber" onChange={handleChange} required />

//         <label>Address:</label>
//         <input type="text" name="address" onChange={handleChange} required />

//         <label>Society Name:</label>
//         <input type="text" name="society_name" onChange={handleChange} required />

//         <label>Description:</label>
//         <textarea name="description" onChange={handleChange} required></textarea>

//         <label>Image URL:</label>
//         <input type="text" name="image" onChange={handleChange} />

//         <button type="submit" className="upload-button">Upload</button>
//       </form>
//     </div>
//   );
// };

// export default BuilderUpload;

// import React, { useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import "./CSS/BuilderUpload.css";

// const BuilderUpload = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const email = searchParams.get("email");

//   const [formData, setFormData] = useState({
//     email: email || "",
//     contactNumber: "",
//     address: "",
//     society_name: "",
//     description: "",
//     image: null, // Now storing the file, not URL
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] }); // Handle file upload
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.contactNumber || !formData.address || !formData.society_name || !formData.description) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     // Use FormData to handle both text and file
//     const data = new FormData();
//     data.append("email", formData.email);
//     data.append("contactNumber", formData.contactNumber);
//     data.append("address", formData.address);
//     data.append("society_name", formData.society_name);
//     data.append("description", formData.description);
//     data.append("image", formData.image); // Append image file

//     fetch("http://localhost:5000/builder-upload", {
//       method: "POST",
//       body: data, // No Content-Type needed; browser sets it automatically
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Upload failed.");
//         }
//         return res.json();
//       })
//       .then(() => {
//         alert("Building uploaded successfully!");
//         navigate(`/builder-dashboard/${email}`);
//       })
//       .catch((err) => {
//         console.error("Upload error:", err);
//         setError("Failed to upload. Please try again.");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload Building</h2>

//       <form className="upload-form" onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input type="email" value={formData.email} disabled />

//         <label>Contact Number:</label>
//         <input type="text" name="contactNumber" onChange={handleChange} required />

//         <label>Address:</label>
//         <input type="text" name="address" onChange={handleChange} required />

//         <label>Society Name:</label>
//         <input type="text" name="society_name" onChange={handleChange} required />

//         <label>Description:</label>
//         <textarea name="description" onChange={handleChange} required></textarea>

//         <label>Upload Image:</label>
//         <input type="file" name="image" accept="image/*" onChange={handleChange} required />

//         <button type="submit" className="upload-button" disabled={isLoading}>
//           {isLoading ? "Uploading..." : "Upload"}
//         </button>

//         {error && <p className="error-message">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default BuilderUpload;


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
    image: null,
    perSquareFootPrice: "",
    totalArea: "",
    constructionYear: "",
    propertyAge: "",
    amenities: "",
    builderName: "",
    termsAccepted: false,
    price2BHK: "",
    price3BHK: "",
    latitude: "",
    longitude: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.contactNumber || !formData.address || !formData.society_name || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/builder-upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Upload failed.");

      alert("Building uploaded successfully!");
      navigate(`/builder-dashboard/${email}`);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

        <label>Per Square Foot Price:</label>
        <input type="number" name="perSquareFootPrice" onChange={handleChange} />

        <label>Total Area (sq ft):</label>
        <input type="number" name="totalArea" onChange={handleChange} />

        <label>Construction Year:</label>
        <input type="number" name="constructionYear" onChange={handleChange} />

        <label>Property Age (years):</label>
        <input type="number" name="propertyAge" onChange={handleChange} />

        <label>Amenities (comma separated):</label>
        <input type="text" name="amenities" onChange={handleChange} />

        <label>Builder Name:</label>
        <input type="text" name="builderName" onChange={handleChange} />

        <label>Price 2BHK:</label>
        <input type="number" name="price2BHK" onChange={handleChange} />

        <label>Price 3BHK:</label>
        <input type="number" name="price3BHK" onChange={handleChange} />

        <label>Latitude:</label>
        <input type="number" name="latitude" step="0.000001" onChange={handleChange} required />

        <label>Longitude:</label>
        <input type="number" name="longitude" step="0.000001" onChange={handleChange} required />

        <label>Upload Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />

        <label>
          <input type="checkbox" name="termsAccepted" onChange={handleChange} required />
          I accept the terms and conditions.
        </label>

        <button type="submit" className="upload-button" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default BuilderUpload;
