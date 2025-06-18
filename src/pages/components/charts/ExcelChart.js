// ChartDashboard.js
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

function ChartDashboard() {
  const [fileList, setFileList] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [rawData, setRawData] = useState([]);
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/file/upload")
      .then((res) => res.json())
      .then((data) => setFileList(data))
      .catch((err) => console.error("Failed to fetch files", err));
  }, []);

  const fetchFileData = async (fileId) => {
    try {
      const res = await fetch(`http://localhost:5000/file/upload/${fileId}`);
      const data = await res.json();
      setRawData(data);
      if (data.length > 0) {
        const keys = Object.keys(data[0]);
        setXField(keys[0]);
        setYField(keys[1]);
      }
    } catch (err) {
      console.error("Error loading file data", err);
    }
  };

  useEffect(() => {
    if (rawData.length > 0 && xField && yField && chartType) {
      const postData = {
        data: rawData,
        xAxis: xField,
        yAxis: yField,
        chartType: chartType,
      };

      fetch("http://localhost:5000/chart/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((res) => res.json())
        .then((processedData) => setChartData(processedData))
        .catch((err) => console.error("Chart processing failed", err));
    }
  }, [rawData, xField, yField, chartType]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/file/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setIsLoading(false);

      if (result._id) {
        setSelectedFileId(result._id);
        fetchFileData(result._id);
        fetch("http://localhost:5000/file/upload")
          .then((res) => res.json())
          .then((data) => setFileList(data));
      } else {
        alert("Upload failed: Invalid response");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Upload error", err);
      alert("Upload failed. Check backend logs.");
    }
  };

  return (
    <div style={{ marginLeft: "260px", marginRight: "10px", marginTop: "20px" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>📊 Chart Dashboard</h2>

      <input type="file" onChange={handleUpload} className="mb-4" />
      {isLoading && <p className="text-blue-500 mb-4">Uploading...</p>}

      {fileList.length > 0 && (
        <div className="mb-4">
          <label className="mr-2 font-semibold">Select File:</label>
          <select
            className="border p-2 rounded"
            value={selectedFileId}
            onChange={(e) => {
              setSelectedFileId(e.target.value);
              fetchFileData(e.target.value);
            }}
          >
            <option value="">-- Choose File --</option>
            {fileList.map((file) => (
              <option key={file._id} value={file._id}>
                {file.filename}
              </option>
            ))}
          </select>
        </div>
      )}

      {rawData.length > 0 && (
        <div className="mb-6 flex gap-4 flex-wrap">
          <div>
            <label className="block mb-1">X Axis:</label>
            <select
              className="border p-2 rounded"
              value={xField}
              onChange={(e) => setXField(e.target.value)}
            >
              {Object.keys(rawData[0]).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Y Axis:</label>
            <select
              className="border p-2 rounded"
              value={yField}
              onChange={(e) => setYField(e.target.value)}
            >
              {Object.keys(rawData[0]).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Chart Type:</label>
            <select
              className="border p-2 rounded"
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="bar">Bar</option>
              <option value="pie">Pie</option>
            </select>
          </div>
        </div>
      )}

      {chartData && (
        <div className="bg-white p-4 rounded shadow">
          {chartType === "pie" ? <Pie data={chartData} /> : <Bar data={chartData} />}
        </div>
      )}
    </div>
  );
}

export default ChartDashboard;
