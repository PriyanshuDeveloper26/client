import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-row-layout">
      <p
        style={{
          marginBottom: "0px",
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "times new roman",
          color: "black",
        }}
      >
        &copy; {new Date().getFullYear()} Excel Analytics Platform. All rights
        reserved.
      </p>
      <div className="footer-icons">
        <a
          href="https://www.linkedin.com/in/sathavara-priyanshu-43089b259"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a
          href="https://github.com/PriyanshuDeveloper26"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a
          href="https://instagram.com/priyanshu_sathvara_?igsh=bG8xNjloYW94b2Nz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
