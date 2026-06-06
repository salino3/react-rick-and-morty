import React from "react";
import { Outlet } from "react-router-dom";
import "./home-layout.styles.scss";

const HomeLayout: React.FC = () => {
  return (
    <div className="rootHomeLayout">
      <Outlet />
    </div>
  );
};

export default HomeLayout;
