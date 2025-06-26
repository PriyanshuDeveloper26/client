import React, { useState } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from 'react-icons/fa';
import Alert from '@mui/material/Alert';
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

const UploadExcel = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      // alert("only .xls and .xlsx files are supported");
      setResponseMessage("only .xls and .xlsx files are supported");
      e.target.value = null;
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    setIsLoading(true);
    if (!file) {
      // alert("Please select a file");
      setResponseMessage("Please select a file");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/file/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await res.json();
    setIsLoading(false);
    alert(result.message);
    if (result.message.includes("uploaded successfully")) {
      setTimeout(() => navigate("/charts"), 1000);
    } else {
      navigate("/uploads");
    }
    // setTimeout(() => {
    //   setResponseMessage("");
    // }, 5000);
  };
  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-1 p-4 sm:ml-56">
        <section className="mb-10">
          <motion.h2
            className="text-3xl font-bold mb-4 text-green-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Upload Your Excel File
          </motion.h2>
          <p className="text-sm text-gray-400 mb-6 max-w-2xl">
            🚀 Want charts instantly? Upload your <span className="text-blue-400 font-medium">.xlsx</span> or <span className="text-blue-400 font-medium">.xls</span> file to get started.<br />
            💡 InsightCraft processes your data and transforms it into interactive charts with clarity.
          </p>

          {/* File Upload Box */}
          <motion.div
            className="border-2 border-dashed border-gray-600 bg-gray-800 rounded-lg p-6 text-center hover:border-green-400 transition-all w-full max-w-lg mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <label htmlFor="file-upload" className="cursor-pointer block">
              <FaCloudUploadAlt className="text-5xl text-green-400 mx-auto mb-2 animate-bounce" />
              <p className="text-sm text-gray-300 font-medium">Click or drop your Excel file here</p>
              <p className="text-xs text-gray-500">Accepted: .xlsx, .xls (Max: 5MB)</p>
            </label>
            <input
              type="file"
              id="file-upload"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm mt-2 text-yellow-300">
                Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
            <button
              onClick={handleUpload}
              className="mt-4 px-6 py-2 rounded-md bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition-all text-white font-semibold shadow"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload & Continue"}
            </button>
            {responseMessage && setTimeout(() => {
          setResponseMessage("");
        }, 4000) && (
          <div
            className="response-message"
            align="center"
          >
            {(responseMessage.includes("uploaded successfully")
              ? <Alert icon={<FaCheck />} severity="success"  style={{ marginTop: "20px", color: "green", backgroundColor: "transparent", justifyContent: "center", fontSize: "16px", fontWeight: "500" }}>
                {responseMessage}
              </Alert>
              : <Alert icon={<FaExclamationTriangle />} severity="error"  style={{ marginTop: "20px", color: "red", backgroundColor: "transparent", justifyContent: "center", fontSize: "16px", fontWeight: "500" }}>
                {responseMessage}
              </Alert>)}
          </div>
        )}
          </motion.div>
        </section>

        {/* Upload Tips Section */}
        <motion.div
          className="bg-gray-800 p-6 rounded-lg mt-8 max-w-3xl mx-auto shadow-lg border border-gray-700"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">📌 Upload Tips</h3>
          <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
            <li>✅ Make sure your Excel file is under 5MB</li>
            <li>✅ Ensure your data starts from the first row</li>
            <li>✅ Avoid merged cells for best compatibility</li>
            <li>✅ The first row should contain column headers</li>
            <li>✅ Supported formats: .xlsx, .xls only</li>
          </ul>
        </motion.div>

        {/* Options Below Upload */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
          <motion.div
            className="bg-gray-800 rounded-lg p-5 shadow-md hover:bg-gray-700 transition h-full"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-2">🔍 Generate Chart</h3>
            <p className="text-gray-400 text-sm">
              Convert your uploaded spreadsheet into interactive graphs. Choose axis, type, and color palette to tell your story.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-5 shadow-md hover:bg-gray-700 transition h-full"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">📂 Upload History</h3>
            <p className="text-gray-400 text-sm">
              Never lose track! View and manage your file history and revisit charts anytime you need.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-5 shadow-md hover:bg-gray-700 transition h-full"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-2">📊 Chart Preview</h3>
            <p className="text-gray-400 text-sm">
              After uploading, head to “Generate Chart” to preview real-time dynamic graphs using your selected data.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-700 mt-10">
          © {new Date().getFullYear()} InsightCraft · Uploads made smarter ·{" "}
          <Link to="/dashboard" className="text-green-400 hover:underline">
            Back to Dashboard
          </Link>
        </footer>
      </main>
    </div>
  );
};
export default UploadExcel;
