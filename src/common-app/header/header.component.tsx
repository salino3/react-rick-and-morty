import type React from "react";
import { Link } from "react-router-dom";
import { routesApp } from "../../router/interface";
import "./header.styles.scss";

export const Header: React.FC = () => {
  return (
    <header className="rootHeader">
      <nav>
        <ul>
          <li>
            <Link to={routesApp.root}>Home</Link>
          </li>
          <li>
            <Link to={routesApp.characters}>Characters</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
