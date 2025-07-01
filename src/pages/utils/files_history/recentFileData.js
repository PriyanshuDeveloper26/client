import React, { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";

const RecentFileData = () => {
  const [limit, setLimit] = useState(3);
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
      <motion.h2
        className="text-2xl font-bold text-green-400 mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recent Files
      </motion.h2>
      <List className="w-[50%] max-h-[300px] border border-white/20 font-sans text-base bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40  rounded-lg shadow-sm p-5">
        {files.slice(0, limit).map((file, index) => (
          <ListItem key={file._id} className="flex items-center justify-between">
            <ListItemText primary={file.fileName + "." + (file.fileType.includes("spreadsheetml.sheet") ? "xlsx" : file.fileType.includes("ms-excel") ? "Xls" : "other")} />
            <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(file._id)}
                className="!ml-4 hover:shadow-lg hover:shadow-white/10 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Delete
              </Button>
          </ListItem>
        ))}
      </List>
      {files.length === 0 && (
        <p className="text-sm text-gray-100">No recent files found</p>
      )}
      {files.length > limit ? (
        <button
          onClick={() => setLimit(limit + 4)}
          className="text-white hover:text-white hover:font-bold hover:underline px-4 py-2 transition-all duration-200"
        >
          Show More
        </button>
      ) : (
        <button
          onClick={() => setLimit(limit - 4)}
          className="text-white hover:text-white hover:font-bold hover:underline px-4 py-2 transition-all duration-200"
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export default RecentFileData;