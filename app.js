import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import BuilderUpload from "./builder_upload";
//import ExpertSelect from "./expert_select";
//import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1 className="main-heading">Real Estate Portal</h1>
        <Routes>
          <Route path="/builder-upload" element={<BuilderUpload />} />
          <Route path="/expert-select" element={<ExpertSelect />} />
        </Routes>
        <ToastContainer/>
      </div>
    </Router>
  );
};

export default App;
