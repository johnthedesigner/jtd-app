import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <ul className="nav-menu">
    <li>
      <Link to="/">Work</Link>
    </li>
    <li>
      <Link to="/contact">Contact</Link>
    </li>
    <li>
      <a
        href="https://github.com/johnthedesigner"
        title="John the designer on Github"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github <i className="fa fa-external-link" />
      </a>
    </li>
    <li>
      <a
        href="https://www.linkedin.com/in/johnlivornese/"
        title="John the designer on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn <i className="fa fa-external-link" />
      </a>
    </li>
  </ul>
);

export default Header;
