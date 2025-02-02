import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import BuilderSignUp from "./BuilderSignUp";
import BuilderLogin from "./BuilderLogin";
import BuilderDashboard from "./BuilderDashboard";
import BuilderUpload from "./builder_upload";
import ExpertLogin from "./expertlogin";
import BuildingsData from "./buildings-data";
import VerifyBuilding from "./verifyBuild";
import HomePage from "./HomePage";
import ChatBotPage from "./chatbot_page";
import "./index.css";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showNavbar = ["/", "/builder-login", "/builder-signup","/expert-login"].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/user/:id" element={<ChatBotPage />} />
          <Route path="/verify-building/:buildingId" element={<VerifyBuilding />} />
          <Route path="/buildings-data" element={<BuildingsData/>}/>
          <Route path="/expert-login" element={<ExpertLogin/>}/>
          <Route path="/builder-login" element={<BuilderLogin />} />
          <Route path="/builder-signup" element={<BuilderSignUp />} />
          <Route path="/builder-upload" element={<BuilderUpload/>} />
          <Route path="/builder-dashboard/:email" element={<BuilderDashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
