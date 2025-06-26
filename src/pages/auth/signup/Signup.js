import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
// import Signuplogo from "D:/excel_analytics_platform_zidio/Frontend/src/assets/images/sign_up_page.jpg";
import Header from "../../header/Header";

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
    <Header />
    {/* <div className="signup-row-container"> */}
      {/* <div className="signup-image-section">
        <img src={Signuplogo} alt="Signup" className="signup-side-image" />
      </div> */}
      <div className="signup-center-form">
        <Form onSubmit={handleSubmit}>
          <h1>Signup</h1>
          {/* {error && <p className="text-danger">{error}</p>} */}
          <Form.Group controlId="formBasicName">
            <Form.Label style={{color: "black"}}>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{color: "black"}}>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{color: "black"}}>Password</Form.Label>
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
            </div>
          </Form.Group>
          <br />
          <Button
            type="submit"
            variant="dark"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </Button>
          <br />
          <br />
          <text>Already have an account? <a href="/login">Login</a></text>
        </Form>
      </div>
    {/* </div> */}
    </>
  );
};

export default Signup;
