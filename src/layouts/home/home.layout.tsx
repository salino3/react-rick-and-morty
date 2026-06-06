import React from "react";
import "./home-layout.styles.scss";

interface Props {
  children: React.ReactNode;
}

export const HomeLayout: React.FC<Props> = ({ children }) => {
  return <div className="rootHomeLayout">{children}</div>;
};
