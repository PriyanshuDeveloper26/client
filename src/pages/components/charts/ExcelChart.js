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
    <div className="ml-64 mr-2.5 mt-2.5">
      <h2 className="text-2xl font-bold mb-4 text-white">
        📊 Chart Dashboard
      </h2>
      {fileList.length > 0 ? (
        <div>
          <select
            value={selectedFileId}
            onChange={(e) =>
              setSelectedFileId(e.target.value) && fetchFileData(e.target.value)
            }
            className="w-50 h-10 rounded border border-gray-300 mr-2.5"
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
            className="mr-2.5 w-50 h-10 rounded border border-gray-300"
          >
            <option value="">-- Choose Chart Type --</option>
            <option value="bar">Bar</option>
            <option value="3d">3d chart</option>
            <option value="scatter">Scatter</option>
            <option value="bubble">Bubble</option>
            <option value="live">Live</option>
          </select>
          {chartType === "3d" ? (
            <div className="flex mt-2.5">
              <select className="w-50 h-10 rounded border border-gray-300 mr-2.5">
                <option value="">Select X Axis</option>
                <option value="">{xField}</option>
              </select>
              <select className="w-50 h-10 rounded border border-gray-300 mr-2.5">
                <option value="">Select Y Axis</option>
                <option value="">{yField}</option>
              </select>
              <select className="w-50 h-10 rounded border border-gray-300 mr-2.5">
                <option value="">Select Z Axis</option>
                <option value="">{xField}</option>
              </select>
            </div>
          ) : (
            <div className="flex mt-2.5">
              <select className="w-50 h-10 rounded border border-gray-300 mr-2.5">
                <option value="">Select X Axis</option>
                <option value="">{xField}</option>
              </select>
              <select className="w-50 h-10 rounded border border-gray-300 mr-2.5">
                <option value="">Select Y Axis</option>
                <option value="">{yField}</option>
              </select>
            </div>
          )}
          <button
              className="mt-2.5 bg-gray-100 shadow-md transform -translate-y-0.5 text-black text-base font-medium rounded border border-gray-300 cursor-pointer w-50 h-10 ml-2.5"
              onClick={handleGenerateChart}
            >
              Generate Chart
            </button>
        </div>
      ) : (
        <div>
          <Alert
            severity="warning"
            className="mt-5 text-red-600 bg-transparent text-2xl font-bold"
          >
            Upload a file first
          </Alert>
          <button
            className="mt-5 bg-gray-100 shadow-md transform -translate-y-0.5 text-black text-base font-medium rounded border border-gray-300 cursor-pointer w-50 h-10 ml-2.5"
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
