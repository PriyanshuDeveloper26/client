import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import './totalFileHistory.css'
import { Table } from "react-bootstrap";
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
    <div>
      <div className="row-layout">
        <div className="total-files">Total Files</div>
        {/* <button className="upload-btn" onClick={() => navigate("/uploads")}>
          {" "}
          + Upload
        </button> */}
      </div>
      <Table striped bordered hover className="total-file-table" variant="dark">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>File Name</th>
            <th>File Type</th>
            <th>File Size</th>
            <th>File Date</th>
            <th>File Action</th>
          </tr>
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
                <button className="total-file-delete-btn" onClick={() => handleDelete(file._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TotalFileHistory;
