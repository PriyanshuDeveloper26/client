// ChartGenerator.jsx (Final version with layout fixes, attractive animated boxes, and optimized layout)

import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import { Bar, Pie, Line, Radar, Doughnut, PolarArea } from "react-chartjs-2";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Sidebar from "../sidebar/sidebar";
import { motion } from "framer-motion";
import { FileContext } from "../../../contexts/FileContext";
import * as XLSX from "xlsx";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";
Chart.register(zoomPlugin);

const ChartGenerator = () => {
  const { fileData } = useContext(FileContext);
  const [columns, setColumns] = useState([]);
  const [xColumn, setXColumn] = useState("");
  const [yColumn, setYColumn] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [colors, setColors] = useState("#4ade80");
  const [title] = useState("Auto Generated Chart");
  const [recentViews, setRecentViews] = useState([]);

  useEffect(() => {
    if (fileData && fileData.length > 0) {
      const cols = Object.keys(fileData[0]);
      setColumns(cols);
      setXColumn(cols[0]);
      setYColumn(cols[1] || cols[0]);
    }
  }, [fileData]);

  useEffect(() => {
    if (title) {
      setRecentViews((prev) => [...new Set([...prev.slice(-4), title])]);
    }
  }, [title]);

  const chartData =
    fileData && xColumn && yColumn
      ? {
          labels: fileData.map((row) => row[xColumn]),
          datasets: [
            {
              label: title,
              data: fileData.map((row) => row[yColumn]),
              backgroundColor: fileData.map(
                (_, i) => `hsl(${(i * 37) % 360}, 70%, 60%)`
              ),
              borderColor: "#1f2937",
              borderWidth: 1,
            },
          ],
        }
      : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: title, color: "#000", font: { size: 18 } },
      legend: { labels: { color: "#000" } },
      zoom: {
        pan: { enabled: true, mode: "xy" },
        zoom: { wheel: { enabled: true }, mode: "xy" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#000" },
        title: { display: true, text: xColumn, color: "#000" },
      },
      y: {
        ticks: { color: "#000" },
        title: { display: true, text: yColumn, color: "#000" },
      },
    },
  };

  const exportChart = async (format) => {
    const chartElement = document.getElementById("chart-preview");
    const canvas = await html2canvas(chartElement);
    const imageData = canvas.toDataURL("image/png");
    if (format === "pdf") {
      const pdf = new jsPDF();
      pdf.addImage(imageData, "PNG", 10, 10, 190, 100);
      pdf.save("chart.pdf");
    } else {
      const blob = await (await fetch(imageData)).blob();
      saveAs(blob, `chart.${format}`);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(fileData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  const renderChart = () => {
    if (!chartData) return null;

    if (chartType === "3d-bar") {
      return (
        <Plot
          data={[
            {
              type: "mesh3d",
              x: fileData.map((r) => r[xColumn]),
              y: fileData.map((r) => r[yColumn]),
              z: fileData.map((r) => r[yColumn]),
              colorscale: "Viridis",
            },
          ]}
          layout={{
            title: title,
            font: { color: "#000" },
            legend: { font: { color: "#000" } },
            line: { color: "#000" },
            paper_bgcolor: "#fff",
            plot_bgcolor: "#fff",
            margin: { t: 30 },
            scene: {
              xaxis: { title: xColumn },
              yaxis: { title: yColumn },
              zaxis: { title: yColumn },
            },
          }}
          style={{ width: "100%", height: "450px", marginTop: "10px" }}
        />
      );
    }

    if (chartType === "candlestick") {
      return (
        <div className="overflow-x-auto">
          <Plot
            data={[
              {
                x: fileData.map((row) => row[xColumn]),
                close: fileData.map((row) => row[yColumn]),
                decreasing: { line: { color: "red" } },
                increasing: { line: { color: "green" } },
                line: { color: "black" },
                type: "candlestick",
                open: fileData.map((row) => row[yColumn]),
                high: fileData.map((row) => row[yColumn]),
                low: fileData.map((row) => row[yColumn]),
                name: title,
              },
            ]}
            layout={{
              title: title,
              font: { color: "#000" },
              legend: { font: { color: "#000" } },
              line: { color: "#000" },
              paper_bgcolor: "#fff",
              plot_bgcolor: "#fff",
            }}
            style={{ width: "100%", height: "450px", marginTop: "10px" }}
          />
        </div>
      );
    }

    const props = { data: chartData, options: chartOptions };
    switch (chartType) {
      case "bar":
        return <Bar {...props} />;
      case "line":
        return <Line {...props} />;
      case "pie":
        return <Pie {...props} />;
      case "radar":
        return <Radar {...props} />;
      case "doughnut":
        return <Doughnut {...props} />;
      case "polarArea":
        return <PolarArea {...props} />;
      default:
        return <Bar {...props} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar></Sidebar>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:ml-56">
        <motion.h2
          className="text-3xl font-bold mb-4 text-green-400"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Chart Generator
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={xColumn}
            onChange={(e) => setXColumn(e.target.value)}
            className="bg-gray-800 p-2 rounded-md"
          >
            <option value="">X-Axis</option>
            {columns.map((col, i) => (
              <option key={i}>{col}</option>
            ))}
          </select>
          <select
            value={yColumn}
            onChange={(e) => setYColumn(e.target.value)}
            className="bg-gray-800 p-2 rounded-md"
          >
            <option value="">Y-Axis</option>
            {columns.map((col, i) => (
              <option key={i}>{col}</option>
            ))}
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-gray-800 p-2 rounded-md"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
            <option value="radar">Radar</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">Polar Area</option>
            <option value="3d-bar">3D Bar</option>
            <option value="candlestick">Candlestick</option>
          </select>
        </div>

        <div className="flex gap-4 mt-4 items-center flex-wrap">
          <label>Color:</label>
          <input
            type="color"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
          />
          <button
            onClick={() => exportChart("pdf")}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportChart("jpg")}
            className="bg-purple-600 px-4 py-2 rounded text-white"
          >
            Export JPG
          </button>
          <button
            onClick={exportToExcel}
            className="bg-yellow-600 px-4 py-2 rounded text-white"
          >
            Export Excel
          </button>
        </div>

        <div
          id="chart-preview"
          className="h-[500px] mt-4 bg-white p-4 rounded-lg"
        >
          {renderChart()}
        </div>

        {fileData && (
          <div className="mt-10 bg-gray-800 p-4 rounded-lg max-h-[450px] overflow-auto">
            <h3 className="text-lg text-green-300 mb-2">📑 Data Preview</h3>
            <div className="overflow-auto max-h-60">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-700">
                  <tr>
                    {columns.map((col, i) => (
                      <th key={i} className="px-2 py-1">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.slice(0, 10).map((row, i) => (
                    <tr key={i} className="border-b border-gray-600">
                      {columns.map((col, j) => (
                        <td key={j} className="px-2 py-1">
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h4 className="text-md text-blue-300">📊 Recent Chart Views:</h4>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {recentViews.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h4 className="text-md text-yellow-300">🕓 Upload History</h4>
            <ul className="text-sm text-gray-300">
              <li>File1.xlsx — 21 June 2025</li>
              <li>Sales_2024.xlsx — 20 June 2025</li>
              <li>Client_Reports.xlsx — 19 June 2025</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h4 className="text-md text-green-300">🤖 AI Chart Insights</h4>
            <p className="text-sm text-gray-300">
              Coming soon: Smart insights from your data using AI!
            </p>
          </motion.div>
        </div>

        <footer className="mt-12 py-6 text-center text-sm text-gray-500 border-t border-gray-700">
          © {new Date().getFullYear()} InsightCraft · Empowering Insights with
          Data
        </footer>
      </main>
    </div>
  );
};

export default ChartGenerator;
