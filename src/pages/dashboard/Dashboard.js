import React from "react";
import Footer from "../components/footer/Footer";
import RecentFileData from "../utils/files_history/recentFileData";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Charts from "./Charts";
const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-gray-100">
      <div className="ml-[260px] mr-4 mt-4">
        <div>
          <h1 className="text-5xl font-bold font-style:italic mb-10 text-center text-green-200">
            Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => navigate("/uploads")}
            className="cursor-pointer p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-3">Upload File</h2>
            <p className="text-lg font-semibold text-white/90">
              Import the data for analysis
            </p>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => navigate("/charts")}
            className="cursor-pointer p-6 bg-gradient-to-r from-green-600 to-green-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Charts Generated
            </h2>
            <p className="text-lg font-semibold text-white/90">
              Click here to generate 2d and 3d charts
            </p>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => navigate("/uploads/total-files")}
            className="cursor-pointer p-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              View total files
            </h2>
            <p className="text-lg font-semibold text-white/90">
              Click here to view total files uploaded
            </p>
          </motion.div>
        </div>
        <div className="flex gap-4 mb-10">
          <div className="flex flex-col w-full gap-4">
            <motion.h2
              className="text-3xl font-bold mb-4 text-green-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sample Charts
            </motion.h2>
            <Charts />
          </div>
        </div>
        <div className="mb-10">
          <RecentFileData />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
