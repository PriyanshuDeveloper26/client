import React, { useEffect, useState } from "react";
import "./recentFileData.css";
import { useNavigate } from "react-router-dom";
import { Table } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const RecentFileData = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/file/recentfiles")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  const navigate = useNavigate();
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
    <div>
      <div className="row-layout">
        <div className="recent-files">Recent Files</div>
        <button className="upload-btn" onClick={() => navigate("/uploads")}>
          {" "}
          + Upload
        </button>
      </div>
      {/* <Table striped bordered hover>
        <thead>
          {files.length > 0 ? (
            <tr>
            <th>Sr No.</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>File Size</th>
            <th>File Date</th>
            <th>File Action</th>
          </tr>
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No files found</td>
            </tr>
          )}
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file._id}>
              <td>{index + 1}</td>
              <td>{file.fileName}</td>
              <td>
                {file.fileType.includes("spreadsheetml.sheet")
                  ? "xlsx"
                  : file.fileType.includes("ms-excel")
                  ? "Xls"
                  : "other"}
              </td>
              <td>{(file.size / 1024).toFixed(2)} MB</td>
              <td>{new Date(file.uploadDate).toLocaleString()}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(file._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell align="right">File Name</TableCell>
            <TableCell align="right">File Type</TableCell>
            <TableCell align="right">File Size</TableCell>
            <TableCell align="right">File Date</TableCell>
            <TableCell align="right">File Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, index) => (
            <TableRow
              key={file._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{file.fileName}</TableCell>
              <TableCell align="right">
                {file.fileType.includes("spreadsheetml.sheet")
                  ? "xlsx"
                  : file.fileType.includes("ms-excel")
                  ? "Xls"
                  : "other"}
              </TableCell>
              <TableCell align="right">
                {(file.size / 1024).toFixed(2)} MB
              </TableCell>
              <TableCell align="right">
                {new Date(file.uploadDate).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(file._id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentFileData;
