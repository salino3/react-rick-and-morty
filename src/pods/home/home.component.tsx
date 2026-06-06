import type React from "react";
import { Link } from "react-router-dom";
import { routesApp } from "../../router/interface";
import "./home.styles.scss";

export const Home: React.FC = () => {
  return (
    <div className="rootHome">
      <h1>Home!</h1>
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
    </div>
  );
};
