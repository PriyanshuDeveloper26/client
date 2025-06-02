import React, { useState } from "react";
import "./Header.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const closeNavbar = () => setExpanded(false);
  return (
    <Navbar
      bg={token ? "transparent" : "transparent"}
      variant="dark"
      expand="md"
      expanded={expanded}
      onToggle={setExpanded}
      className="responsive-navbar"
    >
      <Container>
        <Navbar.Brand className="brand-logo">
          {token && role === "admin"
            ? "Admin Dashboard"
            : "Excel Analytics Platform"}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggler"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                <Nav.Link
                  as={Link}
                  to={role === "admin" ? "/admin-dashboard" : "/dashboard"}
                  className="nav-link"
                  onClick={closeNavbar}
                >
                  {role === "admin" ? "Admin Dashboard" : "Dashboard"}
                </Nav.Link>
                <Nav.Link
                  as={Button}
                  className="logout-btn"
                  onClick={() => {
                    handleLogout();
                    closeNavbar();
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="nav-link"
                  onClick={closeNavbar}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  className="nav-link"
                  onClick={closeNavbar}
                >
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
