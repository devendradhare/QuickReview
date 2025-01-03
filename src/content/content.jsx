import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
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
