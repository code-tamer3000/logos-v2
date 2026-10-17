import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContentProvider } from "./content/ContentProvider";
import "./styles/base.css";
import "./sections/sections.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContentProvider>
  </StrictMode>,
);
