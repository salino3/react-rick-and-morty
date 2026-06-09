import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";
// pnpm add -D jest jest-environment-jsdom ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
// pnpm add --save-dev @types/jest
// pnpm add --save-dev @types/mocha
// pnpm add -D identity-obj-proxy <- for SCSS
// pnpm add -D @jest/globals
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
