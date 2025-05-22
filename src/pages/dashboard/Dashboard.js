import React from "react";
import "./Dashboard.css";
import UploadExcel from "../components/uploads/upload";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <UploadExcel />
    </div>
  );
};

export default Dashboard;
