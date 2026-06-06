import React from "react";
import { Outlet } from "react-router-dom";
import "./characters-layout.styles.scss";

const CharactersLayout: React.FC = () => {
  return (
    <div className="rootCharactersLayout">
      <Outlet />
    </div>
  );
};

export default CharactersLayout;
