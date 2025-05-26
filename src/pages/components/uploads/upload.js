import React from "react";
import "./upload.css";

const UploadExcel = () => {
  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="upload-label">
        <span>📁 Upload Excel</span>
        <input type="file" id="file-input" accept=".xls,.xlsx" onChange={(e) => {}} />
        <button onClick={() => {}}>Upload</button>
      </label>
    </div>
  );
};

export default UploadExcel;
