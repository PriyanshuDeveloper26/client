import React from 'react'
import { Form, Button } from 'react-bootstrap'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
    try {
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
        <Button type="submit" variant="dark" className="w-100">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login
