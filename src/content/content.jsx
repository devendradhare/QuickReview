import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ContentDiv from "./contentDiv.jsx";
import "./content.css";
// import "../index.css";

const root = document.createElement("div");
root.id = "__devendra_dhare";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ContentDiv />
  </StrictMode>
);
