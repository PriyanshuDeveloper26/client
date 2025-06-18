import React, { useState } from "react";
import "./Header.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const [expanded, setExpanded] = useState(false);

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
          Excel Analytics Platform
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggler"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
