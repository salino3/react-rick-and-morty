import React from "react";
import "./characters-layout.styles.scss";

interface Props {
  children: React.ReactNode;
}

export const CharactersLayout: React.FC<Props> = ({ children }) => {
  return <div className="rootCharactersLayout">{children}</div>;
};
