import type { JSX } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { LazyCharactersPage, LazyHomePage, routesApp } from "./interface";
import { Home } from "../pods/home";
import { Characters } from "../pods/characters";

interface PropsRoutes {
  path: string;
  element: JSX.Element;
  component: JSX.Element;
  //   visibility: "public" | "private" | "restricted" | "admin";
}

const routes: PropsRoutes[] = [
  {
    path: routesApp?.root,
    element: <LazyHomePage />,
    component: <Home />,
  },
  {
    path: routesApp?.characters,
    element: <LazyCharactersPage />,
    component: <Characters />,
  },
];

//
const renderedRoutes = routes.map((route) => (
  <Route key={route.path} path={route.path} element={route.element}>
    <Route path={route.path} element={route.component} />
  </Route>
));

export const AppRoutes: React.FC = () => {
  return <Routes>{renderedRoutes}</Routes>;
};
