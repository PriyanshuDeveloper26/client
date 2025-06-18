import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import './totalFileHistory.css'
import { TableBody, TableCell, TableHead, TableRow, TableContainer } from "@mui/material";
import axios from 'axios';

const TotalFileHistory = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/file/recentfiles")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/file/delete/${id}`);
      // Refresh the files list after deletion
      const updatedFiles = files.filter(file => file._id !== id);
      setFiles(updatedFiles);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div align="center">
      <div className="row-layout" align="center">
        <div className="total-files">Total Files</div>
        {/* <button className="upload-btn" onClick={() => navigate("/uploads")}>
          {" "}
          + Upload
        </button> */}
      </div>
      <TableContainer className="total-file-table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>Sr No.</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Name</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Type</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Size</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Date</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={file._id}>
              <TableCell align="left" style={{ color: "white" }}>{index + 1}</TableCell>
              <TableCell align="left" style={{ color: "white" }}>{file.fileName}</TableCell>
              <TableCell align="left" style={{ color: "white" }}>
                {file.fileType.includes("spreadsheetml.sheet")
                  ? "xlsx"
                  : file.fileType.includes("ms-excel")
                  ? "Xls"
                  : "other"}
              </TableCell>
              <TableCell align="left" style={{ color: "white" }}>{(file.size / 1024).toFixed(2)} MB</TableCell>
              <TableCell align="left" style={{ color: "white" }}>{new Date(file.uploadDate).toLocaleString()}</TableCell>
              <TableCell align="left" style={{ color: "white" }}>
                <button className="total-file-delete-btn" onClick={() => handleDelete(file._id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default TotalFileHistory;
