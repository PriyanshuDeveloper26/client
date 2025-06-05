import React from 'react'
import "./ExcelChart.css"
import { motion } from "framer-motion"

const ExcelChart = () => {
  return (
    <motion.div className="excel-chart"
    initial={false}
    animate={{ scale: 1 }}
    whileTap={{ scale: 0.8 }}
    >
      <label htmlFor="chart-input" className="chart-label">
        <span style={{ fontSize: "20px", fontWeight: "bold", fontFamily: 'times new roman' }}>
            Charts Generated
        </span>
        {/* <button type="button" onClick={handleUpload}>
          Upload
        </button> */}
        {/* <motion.button
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {}}
        >
          Generate
        </motion.button> */}
      </label>
    </motion.div>
  )
}

export default ExcelChart