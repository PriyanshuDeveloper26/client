import React from "react";
import "./sidebar.css";
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
  return (
    <>
      {localStorage.getItem("role") === "admin" ? (
        <div className={`sidebar`}>
        <h2 className="sidebar-title"> 📊 Excel Analytics Platform</h2>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin-dashboard">
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
              Manage Files
            </Link>
          </li>
          <li>
            <Link to="/charts">
              <FontAwesomeIcon
                icon={faChartLine}
                style={{ marginRight: "10px", color: "green" }}
              />
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="/uploads/total-files">
              <FontAwesomeIcon
                icon={faClock}
                style={{ marginRight: "10px", color: "yellow" }}
              />
              Manage Activity
            </Link>
          </li>
          <li>
            <Link to="/uploads/total-files">
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: "10px", color: "orange" }}
              />
              Manage Profile
            </Link>
          </li>
          <li className="logout">
            <Link to="/login" onClick={() => localStorage.clear()}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginRight: "10px", color: "red" }}
              />
              Logout {localStorage.getItem("name")}
            </Link>
          </li>
        </ul>
      </div>
      ) : (
        <div className={`sidebar`}>
        <h2 className="sidebar-title"> 📊 Excel Analytics Platform</h2>
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
              Charts 
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
            <Link to="/login" onClick={() => localStorage.clear()}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ marginRight: "10px", color: "red" }}
              />
              Logout {localStorage.getItem("name")}
            </Link>
          </li>
        </ul>
      </div>
      )}
    </>
  );
};

export default Sidebar;
