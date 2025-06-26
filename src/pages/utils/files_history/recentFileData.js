import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const RecentFileData = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/file/recentfiles")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/file/recentfiles/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setFiles(files.filter((file) => file._id !== id));
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-2xl font-bold text-black">Recent Files</div>
        {/* <button className="upload-btn" onClick={() => navigate("/uploads")}>
          {" "}
          + Upload
        </button> */}
      </div>
      <TableContainer className="w-fit font-sans text-base bg-[#111827] rounded-lg shadow-sm p-5">
        <TableHead>
          <TableRow>
            <TableCell className="text-white font-bold">Sr No.</TableCell>
            <TableCell align="left" className="text-white font-bold">File Name</TableCell>
            <TableCell align="left" className="text-white font-bold">File Type</TableCell>
            <TableCell align="left" className="text-white font-bold">File Size</TableCell>
            <TableCell align="left" className="text-white font-bold">Uploaded On</TableCell>
            <TableCell align="left" className="text-white font-bold">File Action</TableCell>
          </TableRow>
        </TableHead>
        {files.length > 0 ? (
        <TableBody>
          {files.map((file, index) => (
            <TableRow
              key={file._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="text-white">
                {index + 1}
              </TableCell>
              <TableCell align="left" className="text-white">{file.fileName}</TableCell>
              <TableCell align="left" className="text-white">
                {file.fileType.includes("spreadsheetml.sheet")
                  ? "xlsx"
                  : file.fileType.includes("ms-excel")
                  ? "xls"
                  : "other"}
              </TableCell>
              <TableCell align="left" className="text-white">
                {(file.size / 1024).toFixed(2)} {file.size.toString().length < 1024 ? "KB" : "MB"}
              </TableCell>
              <TableCell align="left" className="text-white">
                {new Date(file.uploadDate).toLocaleString()}
              </TableCell>
              <TableCell align="left" className="text-white">
                <Button className="w-12 h-12 rounded-full bg-transparent text-[#f5f5f5] hover:text-white transition-colors duration-200" onClick={() => handleDelete(file._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} align="center" className="text-white">
              No files found
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      </TableContainer>
    </div>
  );
};

export default RecentFileData;
