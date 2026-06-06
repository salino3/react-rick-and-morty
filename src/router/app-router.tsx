import type { JSX } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { LazyCharactersPage, LazyHomePage, routesApp } from "./interface";

interface PropsRoutes {
  path: string;
  element: JSX.Element;

  //   visibility: "public" | "private" | "restricted" | "admin";
}

const routes: PropsRoutes[] = [
  {
    path: routesApp?.root,
    element: <LazyHomePage />,
  },
  {
    path: routesApp?.characters,
    element: <LazyCharactersPage />,
  },
];

//
const renderedRoutes = routes.map((route) => (
  <Route key={route.path} path={route.path} element={route.element} />
));

export const AppRoutes: React.FC = () => {
  return <Routes>{renderedRoutes}</Routes>;
};
