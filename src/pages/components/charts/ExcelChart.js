// ChartDashboard.js
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ChartDashboard() {
  const [fileList, setFileList] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [rawData, setRawData] = useState([]);
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");
  const [chartType, setChartType] = useState("bar");
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/file/parsedfiles")
      .then((res) => res.json())
      .then((data) => setFileList(data))
      .catch((err) => console.error("Failed to fetch files", err));
  }, []);

  const fetchFileData = async (fileId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/file/parsedfiles/${fileId}`
      );
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

      fetch("http://localhost:5000/chart/create", {
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
 
  //temp code
  const handleGenerateChart = () => {
    if (selectedFileId && xField && yField && chartType) {
      fetchFileData(selectedFileId);
    }
  };

  return (
    <div
      style={{ marginLeft: "260px", marginRight: "10px", marginTop: "10px" }}
    >
      <h2
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        📊 Chart Dashboard
      </h2>
      {fileList.length > 0 ? (
        <div>
          <select
            value={selectedFileId}
            onChange={(e) =>
              setSelectedFileId(e.target.value) && fetchFileData(e.target.value)
            }
            style={{
              width: "200px",
              height: "40px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          >
            <option value="">-- Choose File --</option>
            {fileList.map((file) => (
              <option key={file._id} value={file._id}>
                {file.filename}
              </option>
            ))}
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            style={{
              marginRight: "10px",
              width: "200px",
              height: "40px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Choose Chart Type --</option>
            <option value="bar">Bar</option>
            <option value="3d">3d chart</option>
            <option value="scatter">Scatter</option>
            <option value="bubble">Bubble</option>
            <option value="live">Live</option>
          </select>
          {chartType === "3d" ? (
            <div style={{ display: "flex", marginTop: "10px" }}>
              <select
                style={{
                  width: "200px",
                  height: "40px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                }}
              >
                <option value="">Select X Axis</option>
                <option value="">{xField}</option>
              </select>
              <select
                style={{
                  width: "200px",
                  height: "40px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                }}
              >
                <option value="">Select Y Axis</option>
                <option value="">{yField}</option>
              </select>
              <select
                style={{
                  width: "200px",
                  height: "40px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                }}
              >
                <option value="">Select Z Axis</option>
                <option value="">{xField}</option>
              </select>
            </div>
          ) : (
            <div style={{ display: "flex", marginTop: "10px" }}>
            <select
              style={{
                width: "200px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            >
              <option value="">Select X Axis</option>
              <option value="">{xField}</option>
            </select>
            <select
              style={{
                width: "200px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            >
              <option value="">Select Y Axis</option>
              <option value="">{yField}</option>
            </select>
            </div>
          )}
          <button
              style={{
                marginTop: "10px",
                background: "rgba(0, 0, 0, 0.1)",
                boxShadow: "0 2px 4px rgba(0, 139, 139, 0.5)",
                transform: "translateY(-2px)",
                color: "black",
                fontSize: "16px",   
                fontWeight: "500",
                borderRadius: "5px",
                border: "1px solid #ccc",
                cursor: "pointer",
                width: "200px",
                height: "40px",
                marginLeft: "10px",
              }}
              onClick={handleGenerateChart}
            >
              Generate Chart
            </button>
        </div>
      ) : (
        <div>
          <Alert
            severity="warning"
            style={{
              marginTop: "20px",
              color: "red",
              backgroundColor: "transparent",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Upload a file first
          </Alert>
          <button
            style={{
              marginTop: "20px",
              background: "rgba(0, 0, 0, 0.1)",
              boxShadow: "0 2px 4px rgba(0, 139, 139, 0.5)",
              transform: "translateY(-2px)",
              color: "black",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "5px",
              border: "1px solid #ccc",
              cursor: "pointer",
              width: "200px",
              height: "40px",
              marginLeft: "10px",
            }}
            onClick={() => navigate("/uploads")}
          >
            Upload File
          </button>
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
              <option value="pie">3d Pie</option>
              <option value="scatter">Scatter</option>
              <option value="bubble">Bubble</option>
              <option value="live">Live</option>
            </select>
          </div>
        </div>
      )}

      {chartData && (
        <div className="bg-white p-4 rounded shadow">
          {chartType === "pie" ? (
            <Pie
              data={chartData}
              options={{ plugins: { legend: { position: "bottom" } } }}
            />
          ) : (
            <Bar
              data={chartData}
              options={{ plugins: { legend: { position: "bottom" } } }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ChartDashboard;
