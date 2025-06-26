import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCloudUploadAlt,
  FaFileAlt,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      {localStorage.getItem("role") === "admin" ? (
        <div className="hidden sm:flex fixed top-0 left-0 h-full w-56 bg-gray-900 text-white shadow-lg z-50 flex-col justify-between py-6">
          <div>
            <h1 className="text-center text-2xl font-bold mb-6 text-green-400">
              InsightCraft
            </h1>
            <hr className="border-gray-700 mb-6" />
            <ul className="flex flex-col gap-4">
              <Link
                to="/admin-dashboard"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaHome className="text-lg" />
                <span>Dashboard</span>
              </Link>
              <Link
                to=""
                className="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-md transition"
              >
                <FaCloudUploadAlt className="text-lg" />
                <span>Manage Users</span>
              </Link>
              <Link
                to=""
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaFileAlt className="text-lg" />
                <span>Manage Files</span>
              </Link>
              <Link
                to=""
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaFileAlt className="text-lg" />
                <span>Manage Charts</span>
              </Link>
              <Link
                to=""
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaUserCircle className="text-lg" />
                <span>Profile</span>
              </Link>
            </ul>
          </div>
          <div className="px-4 mt-6 border-t border-gray-700 pt-4">
            <div className="flex items-center gap-3">
              <button
                className="text-red-400 text-xs hover:underline flex items-center gap-1"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="text-xs" /> Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex fixed top-0 left-0 h-full w-56 bg-gray-900 text-white shadow-lg z-50 flex-col justify-between py-6">
          <div>
            <h1 className="text-center text-2xl font-bold mb-6 text-green-400">
              InsightCraft
            </h1>
            <hr className="border-gray-700 mb-6" />
            <ul className="flex flex-col gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaHome className="text-lg" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/uploads"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaCloudUploadAlt className="text-lg" />
                <span>Upload File</span>
              </Link>
              <Link
                to="/charts"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaFileAlt className="text-lg" />
                <span>Generate Chart</span>
              </Link>
              <Link
                to="/user-profile"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md transition"
              >
                <FaUserCircle className="text-lg" />
                <span>Profile</span>
              </Link>
            </ul>
          </div>
          <div className="px-4 mt-6 border-t border-gray-700 pt-4">
            <div className="flex items-center gap-3">
              <button
                className="text-red-400 text-xs hover:underline flex items-center gap-1"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <FaSignOutAlt className="text-xs" /> Logout{" "}
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
