import React, { lazy } from "react";

interface Routes {
  root: string;
  characters: string;
  error404: string;
}

export const routesApp: Routes = {
  root: "/",
  characters: "/dashboard",
  error404: "*",
};

// Lazy Page Components
export const LazyHomePage: React.LazyExoticComponent<React.FC> = lazy(
  () => import("../layouts/home/home.layout"),
); // with 'export default'

export const LazyCharactersPage: React.LazyExoticComponent<React.FC<{}>> = lazy(
  () => import("../layouts/characters/characters.layout"),
);
