import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

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
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center p-4">
        <div className="font-bold text-white text-2xl font-times-new-roman">Total Files</div>
        {/* <button className="upload-btn" onClick={() => navigate("/uploads")}>
          {" "}
          + Upload
        </button> */}
      </div>
      <TableContainer className="w-fit font-sans text-base bg-[#111827] rounded-lg shadow-sm p-5">
        <TableHead>
          <TableRow>
            <TableCell align="left" className="text-white font-bold">Sr No.</TableCell>
            <TableCell align="left" className="text-white font-bold">File Name</TableCell>
            <TableCell align="left" className="text-white font-bold">File Type</TableCell>
            <TableCell align="left" className="text-white font-bold">File Size</TableCell>
            <TableCell align="left" className="text-white font-bold">File Date</TableCell>
            <TableCell align="left" className="text-white font-bold">File Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={file._id}>
              <TableCell align="left" className="text-white">{index + 1}</TableCell>
              <TableCell align="left" className="text-white">{file.fileName}</TableCell>
              <TableCell align="left" className="text-white">
                {file.fileType.includes("spreadsheetml.sheet")
                  ? "xlsx"
                  : file.fileType.includes("ms-excel")
                  ? "Xls"
                  : "other"}
              </TableCell>
              <TableCell align="left" className="text-white">{(file.size / 1024).toFixed(2)} MB</TableCell>
              <TableCell align="left" className="text-white">{new Date(file.uploadDate).toLocaleString()}</TableCell>
              <TableCell align="left" className="text-white">
                <button className="bg-transparent text-white hover:text-white hover:font-bold hover:underline px-4 py-2 transition-all duration-200" onClick={() => handleDelete(file._id)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default TotalFileHistory;
