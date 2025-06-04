import React, { useState } from "react";
import "./upload.css";
import { motion } from "framer-motion";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert("only .xls and .xlsx files are supported");
      e.target.value = null;
      return;
    }
    console.log(selectedFile);
    setResponseMsg("");
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    setIsLoading(true);
    if (!file) {
      alert("Please select a file");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/file/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setResponseMsg(result.message);
    console.log(result);
    setIsLoading(false);
  };
  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="upload-label">
        <span>
          {file ? "📁 " + file.name : "📁 Upload File Here "}{" "}
          {isLoading ? " uploading..." : ""}
        </span>
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
      </label>
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
};

export default UploadExcel;
