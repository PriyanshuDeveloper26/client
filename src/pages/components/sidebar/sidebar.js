import React, { useState } from "react";
import "./sidebar.css";
import { FiMenu, FiX } from "react-icons/fi"; // npm install react-icons
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faFileUpload,
  faChartLine,
  faUser,
  faHome,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Excel Analytics Platform</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon
                icon={faHome}
                style={{ marginRight: "10px", color: "pink" }}
              />
              Home
            </Link>
          </li>
          <li>
            <Link to="/uploads">
              <FontAwesomeIcon
                icon={faFileUpload}
                style={{ marginRight: "10px", color: "blue" }}
              />
              Upload Files
            </Link>
          </li>
          <li>
            <Link to="/charts">
              <FontAwesomeIcon
                icon={faChartLine}
                style={{ marginRight: "10px", color: "green" }}
              />
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/uploads/total-files">
              <FontAwesomeIcon
                icon={faClock}
                style={{ marginRight: "10px", color: "yellow" }}
              />
              Recent Activity
            </Link>
          </li>
          <li>
            <Link to="/uploads/total-files">
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: "10px", color: "orange" }}
              />
              User Profile
            </Link>
          </li>
          <li className="logout">
            <Link to="/login">
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginRight: "10px", color: "red" }}
              />
              Logout {localStorage.getItem("name")}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
