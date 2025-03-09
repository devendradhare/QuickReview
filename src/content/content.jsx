import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContextProvider from "./contextAPI/ContextProvider";
import ContentApp from "./contentApp.jsx";

const root = document.createElement("div");
root.id = "__devendra_dhare";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ContextProvider>
      <ContentApp />
    </ContextProvider>
  </StrictMode>
);
