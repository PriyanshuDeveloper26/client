import React from "react";
import "./Dashboard.css";
// import Sidebar from "../components/sidebar/sidebar";
import Footer from "../components/footer/Footer";
import RecentFileData from "../utils/files_history/recentFileData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="flex" style={{ marginLeft: "260px", marginRight: "10px", marginTop: "10px" }}>
      <div className="dashboard-row">
        <div className="dashboard-item">
          <motion.div className="dashboard-card"
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={ () => navigate("/uploads")}
          >
            <label htmlFor="dashboard-input" className="dashboard-label">
              <span style={{ fontSize: "20px", fontWeight: "bold", fontFamily: 'times new roman' }}>
                  Upload File
              </span>
            </label>
          </motion.div>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "cursive",
              marginTop: "10px",
              color: "black"
            }}
          >
            Import the data for analysis
          </p>
        </div>
        <div className="dashboard-item">
          <motion.div className="dashboard-card"
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={ () => navigate("/charts")}
          >
            <label htmlFor="dashboard-input" className="dashboard-label">
              <span style={{ fontSize: "20px", fontWeight: "bold", fontFamily: 'times new roman' }}>
                  Charts Generated
              </span>
            </label>
          </motion.div>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "cursive",
              marginTop: "10px",
              color: "black"
            }}
          >
            Click here to generate 2d and 3d charts
          </p>
        </div>
        <div className="dashboard-item">
          <motion.div className="dashboard-card"
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={ () => navigate("/uploads/total-files")}
          >
            <label htmlFor="dashboard-input" className="dashboard-label">
              <span style={{ fontSize: "20px", fontWeight: "bold", fontFamily: 'times new roman' }}>
                  View total files
              </span>
            </label>
          </motion.div>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "cursive",
              marginTop: "10px",
              color: "black"
            }}
          >
            Click here to view total files uploaded
          </p>
        </div>
      </div>
      <br />
      <br />
      <RecentFileData />
      <Footer />
    </div>
  );
};

export default Dashboard;
