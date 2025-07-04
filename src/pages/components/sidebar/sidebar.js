import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCloudUploadAlt,
  FaFileAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      {localStorage.getItem("role") === "admin" ? (
        <div className="hidden sm:flex fixed top-0 left-0 h-full w-56 bg-gray-900 text-white shadow-lg z-50 flex-col justify-between py-6">
          <div>
            <h1 className="text-center text-[18px] font-bold mb-6 text-green-400">
              Excel Analytics Platform
            </h1>
            <hr className="border-gray-700 mb-6" />
            <ul className="flex flex-col gap-4">
              {location.pathname === "/admin-dashboard" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaHome className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/admin-dashboard"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaHome className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              )}
              {location.pathname === "/uploads" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaCloudUploadAlt className="text-lg" />
                  <span>Upload File</span>
                </Link>
              ) : (
                <Link
                  to="/uploads"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaCloudUploadAlt className="text-lg" />
                  <span>Manage Users</span>
                </Link>
              )}
              {location.pathname === "/uploads/total-files" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaFileAlt className="text-lg" />
                  <span>Manage Files</span>
                </Link>
              ) : (
                <Link
                  to="/uploads/total-files"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaFileAlt className="text-lg" />
                  <span>Manage Charts</span>
                </Link>
              )}
              {location.pathname === "/user-profile" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaUserCircle className="text-lg" />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link
                  to="/user-profile"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaUserCircle className="text-lg" />
                  <span>Profile</span>
                </Link>
              )}
            </ul>
          </div>
          <div className="px-4 mt-6 border-t border-gray-700 pt-4">
            <div className="flex items-center gap-3">
              <button
                className="text-red-400 text-1xl hover:underline flex items-center gap-1"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-1xl" /> Logout {""}{" "}
                {localStorage.getItem("name")}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex fixed top-0 left-0 h-full w-56 bg-gray-900 text-white z-50 flex-col justify-between py-6">
          <div>
            <h1 className="text-center text-[18px] font-bold mb-6 text-green-400">
              Excel Analytics Platform
            </h1>
            <hr className="border-gray-700 mb-6" />
            <ul className="flex flex-col gap-4">
              {location.pathname === "/dashboard" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaHome className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaHome className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              )}
              {location.pathname === "/uploads" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaCloudUploadAlt className="text-lg" />
                  <span>Upload File</span>
                </Link>
              ) : (
                <Link
                  to="/uploads"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaCloudUploadAlt className="text-lg" />
                  <span>Upload File</span>
                </Link>
              )}
              {location.pathname === "/charts" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaFileAlt className="text-lg" />
                  <span>Generate Chart</span>
                </Link>
              ) : (
                <Link
                  to="/charts"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaFileAlt className="text-lg" />
                  <span>Generate Chart</span>
                </Link>
              )}
              {location.pathname === "/uploads/total-files" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaClock className="text-lg" />
                  <span>View Recent Activity</span>
                </Link>
              ) : (
                <Link
                  to="/uploads/total-files"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaClock className="text-lg" />
                  <span>View Recent Activity</span>
                </Link>
              )}
              {location.pathname === "/user-profile" ? (
                <Link className="flex cursor-text items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 rounded-md">
                  <FaUserCircle className="text-lg" />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link
                  to="/user_profile"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 hover:text-green-400 hover:shadow-md hover:shadow-green-400/20 hover:-translate-y-0.5 transition-all duration-300  rounded-md"
                >
                  <FaUserCircle className="text-lg" />
                  <span>Profile</span>
                </Link>
              )}
            </ul>
          </div>
          <div className="px-4 mt-6 border-t border-gray-700 pt-4">
            <div className="flex items-center gap-3">
              <button
                className="text-red-400 text-1xl hover:underline flex items-center gap-1"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <FaSignOutAlt className="text-1xl" /> Logout{" "}
                {localStorage.getItem("name")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
