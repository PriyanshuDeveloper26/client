import React from "react";
import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <Navbar bg={token ? "transparent" : "transparent"} variant="dark">
      <Container>
        <Navbar.Brand>
          {/* {token ? "Excel Analytics Platform" : "Hey,there"} */}
          {token && role === "admin"
            ? "Admin Dashboard"
            : "Excel Analytics Platform"}
        </Navbar.Brand>
        <Nav className="ml-auto">
          {token ? (
            <>
              <Nav.Link
                as={Link}
                to={role === "admin" ? "/admin-dashboard" : "/dashboard"}
                className="nav-link"
              >
                {role === "admin" ? "Admin Dashboard" : "Dashboard"}
              </Nav.Link>
              <Nav.Link as={Link} to="/login" onClick={handleLogout}>
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
