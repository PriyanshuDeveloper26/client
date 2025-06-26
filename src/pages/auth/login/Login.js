import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import logo from "D:/excel_analytics_platform_zidio/Frontend/src/assets/images/login_page.jpg";
import Header from "../../header/Header";
import { Skeleton } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
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
    if (!formData.name || !formData.password) {
      alert("All fields are required");
      // setError("All fields are required");
      return;
    }
    if (!formData.name) {
      alert("Name is required");
      // setError("Email is required");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      // setError("Password must be at least 6 characters long");
      return;
    }
    // setError("");

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
      <Header />
      {/* <div className="login-row-container"> */}

      {/* login image */}
      {/* <div className="login-image-section">
        <img src={logo} alt="Logo" className="login-side-image" />
      </div> */}

      {/* login form */}
      <div className="center-form" >
        <Form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {/* {error && <p className="text-danger">{error}</p>} */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{ color: "black" }}>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{ color: "black" }}>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="show-password-checkbox">
              <div>
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword" className="show-password-label">
                  Show Password
                </label>
              </div>
              <div className="login-actions">
                <a href="forgot-password" className="forgot-link">
                  Forgot Password?
                </a>
              </div>
            </div>
          </Form.Group>
          <br />
          <Button
            type="submit"
            variant="dark"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? <Skeleton variant="rectangular" color="cyan" className="w-100" animation="wave" width="100%" padding={12} /> : "Login"}
          </Button>
          <br />
          <br />
          <text>Don't have an account? <a href="/register">Register</a></text>
        </Form>
      </div>
      {/* </div> */}
    </>
  );
};

export default Login;
