// ChartDashboard.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartDashboard() {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [rawData, setRawData] = useState([]);
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");
  const [chartData, setChartData] = useState(null);

  // Load uploaded file list
  const fetchFiles = () => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error("Failed to load files", err));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Load data for selected file
  const fetchFileData = (fileId) => {
    fetch(`/api/files/${fileId}/data`)
      .then((res) => res.json())
      .then((data) => {
        setRawData(data);
        if (data.length > 0) {
          const keys = Object.keys(data[0]);
          setXField(keys[0]);
          setYField(keys[1]);
        }
      });
  };

  // Rebuild chart when data or axis changes
  useEffect(() => {
    if (rawData.length > 0 && xField && yField) {
      const labels = rawData.map((row) => row[xField]);
      const values = rawData.map((row) => row[yField]);

      setChartData({
        labels,
        datasets: [
          {
            label: `${yField} vs ${xField}`,
            data: values,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    }
  }, [rawData, xField, yField]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">📈 Excel File Chart Viewer</h2>

      {files.length > 0 && (
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
            {files.map((file) => (
              <option key={file._id} value={file._id}>
                {file.filename}
              </option>
            ))}
          </select>
        </div>
      )}

      {rawData.length > 0 && (
        <div className="mb-6 flex gap-6">
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
        </div>
      )}

      {chartData && (
        <div className="bg-white p-4 rounded shadow">
          <Bar data={chartData} />
        </div>
      )}
    </div>
  );
}

export default ChartDashboard;
