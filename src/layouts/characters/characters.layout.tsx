import React from "react";
import { Characters } from "../../pods/characters";
import "./characters-layout.styles.scss";

const CharactersLayout: React.FC = () => {
  return (
    <div className="rootCharactersLayout">
      <Characters />
    </div>
  );
};

export default CharactersLayout;
