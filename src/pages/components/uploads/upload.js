import React, { useState } from "react";
import "./upload.css";

const UploadExcel = () => {
  const [file, setFile] = useState(null);

  const [responseMsg, setResponseMsg] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
  
    if(selectedFile && !allowedTypes.includes(selectedFile.type)){
      alert("only .xls and .xlsx files are supported");
      e.target.value = null;
      return;
    }
    console.log(selectedFile);
    setResponseMsg("");
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    if (!file) {
      setResponseMsg("Please select a file");
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
  };
  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="upload-label">
        <span>📁 Upload Excel</span>
        <input
          type="file"
          id="file-input"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
        />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      </label>
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
};

export default UploadExcel;
