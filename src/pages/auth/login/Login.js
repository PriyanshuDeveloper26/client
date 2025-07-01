import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Skeleton } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.password) {
      alert("All fields are required");
      return;
    }
    if (!formData.name) {
      alert("Name is required");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      navigate("/welcomeBack");
      localStorage.setItem("token", result.token);
      formData.name === "Admin" && formData.password === "admin@123"
        ? localStorage.setItem("role", "admin")
        : localStorage.setItem("role", "user");
      localStorage.setItem("name", result.name);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setFormData({
        name: "",
        password: "",
      });
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-10 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg shadow-black/30 text-black"
        >
          <h1 className="text-5xl font-bold font-style:italic mb-10 text-center text-green-200">
            Login
          </h1>
          <div className="mb-5">
            <label className="block text-white font-bold mb-2 text-center text-gray-100">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:shadow-outline hover:border-white/40"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-white font-bold mb-2 text-center text-gray-100">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:shadow-outline hover:border-white/40"
              required
            />
            <div className="flex justify-between items-center mt-2 mb-4 text-sm text-black">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
                <label
                  htmlFor="showPassword"
                  className="cursor-pointer font-medium text-gray-100"
                >
                  Show Password
                </label>
              </div>
              <div className="flex justify-end">
                <a
                  href="forgot-password"
                  className="text-gray-100 hover:text-blue-500 underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-900 text-white font-bold hover:bg-green-900 hover:shadow-lg hover:shadow-white/10 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                color="cyan"
                className="w-full h-10"
                animation="wave"
              />
            ) : (
              "Login"
            )}
          </button>
          <p className="mt-6 text-center text-sm text-gray-100">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
