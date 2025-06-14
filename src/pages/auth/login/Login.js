import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

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
      if (formData.name === "admin" && formData.password === "admin@123") {
        navigate("/admin-dashboard");
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", "admin");
        localStorage.setItem("name", formData.name);
      } else {
        navigate("/dashboard");
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", "user");
        localStorage.setItem("name", formData.name);
      }
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
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* {error && <p className="text-danger">{error}</p>} */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="login-actions">
          <a href="forgot-password" className="forgot-link">
            Forgot Password?
          </a>
        </div>
        <br />
        <Button
          type="submit"
          variant="dark"
          className="w-100"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
