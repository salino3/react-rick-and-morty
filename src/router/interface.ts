// import React, { lazy } from "react";

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
