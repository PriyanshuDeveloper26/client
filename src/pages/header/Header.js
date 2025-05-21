import React from "react";
import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Navbar bg={token ? "primary" : "dark"} variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="">
          {token ? "Excel Analytics Platform" : "Hey,there"}
        </Navbar.Brand>
        <Nav className="ml-auto">
          {token ? (
            <>
              <Nav.Link as={Link} to="/dashboard" className="nav-link">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/logout" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="nav-link">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="nav-link">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
