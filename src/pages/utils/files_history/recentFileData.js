import React, { useEffect, useState } from "react";
import "./recentFileData.css";
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
    <div>
      <div className="row-layout">
        <div className="recent-files">Recent Files</div>
        {/* <button className="upload-btn" onClick={() => navigate("/uploads")}>
          {" "}
          + Upload
        </button> */}
      </div>
      <TableContainer className="recent-file-table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>Sr No.</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Name</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Type</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Size</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>Uploaded On</TableCell>
            <TableCell align="left" style={{ color: "white", fontWeight: "bold" }}>File Action</TableCell>
          </TableRow>
        </TableHead>
        {files.length > 0 ? (
        <TableBody>
          {files.map((file, index) => (
            <TableRow
              key={file._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ color: "white"}}>
                {index + 1}
              </TableCell>
              <TableCell align="left" style={{ color: "white" }}>{file.fileName}</TableCell>
              <TableCell align="left" style={{ color: "white" }}>
                {file.fileType.includes("spreadsheetml.sheet")
                  ? "xlsx"
                  : file.fileType.includes("ms-excel")
                  ? "xls"
                  : "other"}
              </TableCell>
              <TableCell align="left" style={{ color: "white" }}>
                {(file.size / 1024).toFixed(2)} {file.size.toString().length < 1024 ? "KB" : "MB"}
              </TableCell>
              <TableCell align="left" style={{ color: "white" }}>
                {new Date(file.uploadDate).toLocaleString()}
              </TableCell>
              <TableCell align="left" style={{ color: "white" }}>
                {/* <button
                  className="delete-btn"
                  onClick={() => handleDelete(file._id)}
                >
                  Delete
                </button> */}
                <Button className="delete-btn" onClick={() => handleDelete(file._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                {/* /
                <Button className="Analyze-btn" onClick={() => navigate(`/charts`)}>
                  <FontAwesomeIcon icon={faFile} />
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} align="center">
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
