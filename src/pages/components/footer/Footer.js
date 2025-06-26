import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <footer className="flex justify-between items-center bg-transparent text-black text-center p-5">
      <p className="mb-0 text-base font-normal text-black font-times-new-roman">
        &copy; {new Date().getFullYear()} Excel Analytics Platform. All rights
        reserved.
      </p>
      <div className="flex justify-center gap-5">
        <a
          href="https://www.linkedin.com/in/sathavara-priyanshu-43089b259"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-gray-100 hover:shadow-md hover:shadow-blue-500/50 hover:text-indigo-600 hover:rounded-lg hover:h-10 hover:w-10"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-black text-6xl transition-color duration-300" />
        </a>
        <a
          href="https://github.com/PriyanshuDeveloper26"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} className="text-black text-6xl transition-color duration-300" />
        </a>
        <a
          href="https://instagram.com/priyanshu_sathvara_?igsh=bG8xNjloYW94b2Nz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} className="text-black text-6xl transition-color duration-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
