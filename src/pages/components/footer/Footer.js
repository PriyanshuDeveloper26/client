import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <footer className="static left-0 right-0 flex justify-between text-center py-6 text-sm text-gray-500 border-t border-gray-700 mr-4">
      <p className="text-base font-normal font-times-new-roman">
        &copy; {new Date().getFullYear()} Excel Analytics Platform. All rights
        reserved.
      </p>
      <div className="flex justify-center gap-5">
        <a
          href="https://www.linkedin.com/in/sathavara-priyanshu-43089b259"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-blue-500 text-2xl transition-color duration-300" />
        </a>
        <a
          href="https://github.com/PriyanshuDeveloper26"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} className="text-white text-2xl transition-color duration-300" />
        </a>
        <a
          href="https://instagram.com/priyanshu_sathvara_?igsh=bG8xNjloYW94b2Nz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="text-pink-500 text-2xl transition-color duration-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
