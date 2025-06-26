import React from "react";

import { useNavigate } from "react-router-dom";

const WelcomeBack = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  return (
    <>
    <div className="h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
      <div className="bg-[rgba(15,53,68,0.486)] backdrop-blur-xl rounded-2xl p-10 max-w-[400px] w-[90%] text-white text-center shadow-lg border border-white/20">
        <h1 className="text-2xl mb-1">Welcome Back,</h1>
        <h2 className="font-cursive text-[#f5deb3] text-xl font-medium mb-4">{name} 👋</h2>
        <p className="text-[#c2d8ce] text-lg mb-6">We're glad to see you again!</p>
        <button className="bg-[rgba(26,119,156,0.5)] text-white hover:text-white hover:bg-black/50 hover:shadow-[0_2px_4px_rgba(73,206,206,0.5)] hover:-translate-y-0.5 transition-all duration-300 px-6 py-2.5 rounded-xl" onClick={() => {
          localStorage.getItem("role") === "admin"
            ? navigate("/admin-dashboard")
            : navigate("/dashboard")
        }}>
          {localStorage.getItem("role") === "admin"
            ? "Go to Admin Dashboard"
            : "Go to Dashboard"}
        </button>
      </div>
    </div>
    </>
  );
};

export default WelcomeBack;
