import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  // for error message
  // const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      // setError("All fields are required");
      return;
    }
    // if (!formData.name) {
    //   setError("Name is required");
    //   return;
    // }
    // if (!formData.email) {
    //   setError("Email is required");
    //   return;
    // }
    // if (!formData.password) {
    //   setError("Password is required");
    //   return;
    // }
    if (!formData.email.includes("@")) {
      // setError("Email must contain @");
      alert("Email must contain @");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // setError("Invalid email");
      alert("Invalid email");
      return;
    }
    if (formData.password.length < 6) {
      // setError("Password must be at least 6 characters long");
      alert("Password must be at least 6 characters long");
      return;
    }
    // setError("");

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log(result);
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-10 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg shadow-black/30 text-black">
          <h1 className="text-5xl font-bold font-style:italic mb-10 text-center text-green-200">Signup</h1>
          {/* {error && <p className="text-danger">{error}</p>} */}
          <div className="mb-5">
            <label className="block text-black font-bold mb-2 text-center text-gray-100">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:shadow-outline hover:border-white/40"
            />
          </div>

          <div className="mb-5">
            <label className="block text-black font-bold mb-2 text-center text-gray-100">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:shadow-outline hover:border-white/40"
            />
          </div>

          <div className="mb-5">
            <label className="block text-black font-bold mb-2 text-center text-gray-100">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:shadow-outline hover:border-white/40"
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
              "Signup"
            )}
          </button>
          <p className="mt-6 text-center text-sm text-gray-100">
            Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-600 underline">Login</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
