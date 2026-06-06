import React from "react";
import { Home } from "../../pods/home";
import "./home-layout.styles.scss";

const HomeLayout: React.FC = () => {
  return (
    <div className="rootHomeLayout">
      <Home />
    </div>
  );
};

export default HomeLayout;
