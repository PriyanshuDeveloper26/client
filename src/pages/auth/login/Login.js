import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
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
    if (!formData.email || !formData.password) {
      alert("All fields are required");
      // setError("All fields are required");
      return;
    }
    if (!formData.email) {
      alert("Email is required");
      // setError("Email is required");
      return;
    }
    // if (!formData.password) {
    //   setError("Password is required");
    //   return;
    // }
    // if (!formData.email.includes("@")) {
    //   setError("Email must contain @");
    //   return;
    // }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Invalid email");
      // setError("Invalid email");
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
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setFormData({
        email: "",
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
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
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
        <a href="forgot-password" className="forgot-link">Forgot Password?</a>
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
