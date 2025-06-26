import React, { useState } from "react";
import "./upload.css";
import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

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
    setResponseMessage(result.message);
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
    <div
      className="file-upload"
      align="center"
      style={{ marginTop: "100px", marginLeft: "260px", marginRight: "10px" }}
    >
      <label htmlFor="file-input" className="upload-label">
        <span>{file ? file.name : "📁 Upload file here "} </span>
        <input
          type="file"
          id="file-input"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          required
        />
        {/* <button type="button" onClick={handleUpload}>
          Upload
        </button> */}
        <motion.button
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </motion.button>
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
      </label>
      {file && (
        <div
          className="file-details"
          align="center"
          style={{ marginTop: "20px" }}
        >
          <strong>Selected File:</strong> {file.name} <br />
          <strong>File Size:</strong> {(file.size / 1024).toFixed(2)}{" "}
          {file.size.toString().length < 1024 ? "KB" : "MB"} <br />
          <strong>File Type:</strong>{" "}
          {file.type.includes("spreadsheetml.sheet")
            ? "xlsx"
            : file.type.includes("ms-excel")
            ? "Xls"
            : "other"}
        </div>
      )}
    </div>
  );
};
export default UploadExcel;
