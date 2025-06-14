import React, { useState } from "react";
import "./Header.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [expanded, setExpanded] = useState(false);

  const isDashboard =
    location.pathname === "/dashboard" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/login" ||
    location.pathname === "/register" || location.pathname === "/";

  const handleBack = () => {
    navigate(-1);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
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
      {!isDashboard && (
        <motion.button
          className="back-button"
          onClick={handleBack}
          initial={false}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <FaArrowLeft style={{ marginRight: "6px" }} />
        </motion.button>
      )}
        <Navbar.Brand className="brand-logo">
          {token && role === "admin"
            ? "Admin Dashboard"
            : ( "Excel Analytics Platform")}
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
                  to={"/uploads"}
                  className="nav-link"
                  onClick={closeNavbar}
                >
                  {location.pathname !== "/uploads" ? "Upload" : ""}
                </Nav.Link>
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
