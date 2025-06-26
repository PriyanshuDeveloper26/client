import React from "react";
import "./welcomeBack.css";
import { useNavigate } from "react-router-dom";

const WelcomeBack = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  return (
    <>
    <div className="glass-wrapper">
      <div className="glass-card">
        <h1>Welcome Back,</h1>
        <h2>{name} 👋</h2>
        <p>We're glad to see you again!</p>
        <button className="action-btn" onClick={() => {
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
