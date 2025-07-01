import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import axios from 'axios';
// import { List, ListItem, ListItemText, Button } from "@mui/material";
// import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const TotalFileHistory = () => {
  // const [limit, setLimit] = useState(2);
  const [files, setFiles] = useState([]);
  const columns = ["File Name", "File Type", "File Size", "File Date"];

  useEffect(() => {
    fetch("http://localhost:5000/file/recentfiles")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // const navigate = useNavigate();

  return (
    <div className="ml-[240px] mr-[15px] mt-[15px] text-center space-y-4">
      <motion.h2
        className="text-3xl font-bold mb-4 text-green-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        View Total Files
      </motion.h2>
      <div className="overflow-auto !p-5 max-h-100">
        <table
          className="w-[80%] text-left bg-white/10 backdrop-blur-sm shadow-sm p-5"
          align="center"
        >
          <thead className="bg-green-700">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-2 py-1 text-lg text-white">
                  {col}
                </th> 
              ))}
            </tr>
          </thead>
          <tbody>
            {files.slice(0, 10).map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-600 hover:bg-gray-900 transition-all duration-300"
              >
                <td>
                  <span className="text-white ml-2">{row.fileName}</span>
                </td>
                <td>
                  <span className="text-white ml-2">
                    {row.fileType.includes("spreadsheetml.sheet")
                      ? "xlsx"
                      : row.fileType.includes("ms-excel")
                      ? "xls"
                      : "other"}
                  </span>
                </td>
                <td>
                  <span className="text-white ml-2">
                    {row.size / 1024 / 1024 > 1
                      ? (row.size / 1024 / 1024).toFixed(2) + " MB"
                      // : row.size / 1024 > 1
                      : (row.size / 1024).toFixed(2) + " KB"}
                       {/* : row.size.toFixed(2) + " B"} */}
                  </span>
                </td>
                <td>
                  <span className="text-white ml-2">{(row.uploadDate).toLocaleString().split("T")[0] || "N/A"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 ml-[240px] mr-[15px] text-center py-6 text-sm text-gray-500 border-t border-gray-700 mt-10">
          © {new Date().getFullYear()} Excel Analytics Platform · Uploads made smarter ·{" "}
          <Link to="/dashboard" className="text-green-400 hover:underline">
            Back to Dashboard
          </Link>
        </footer>
    </div>
  );
};

export default TotalFileHistory;
