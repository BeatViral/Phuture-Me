import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PhutureMeApp } from "./PhutureMeApp";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PhutureMeApp />
  </StrictMode>,
);

