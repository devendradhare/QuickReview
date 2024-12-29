import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import ContextProvider from "./ContextProvider";
import ContentDiv from "./contentDiv.jsx";

const root = document.createElement("div");
root.id = "__devendra_dhare";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <ContextProvider>
      <ContentDiv />
    </ContextProvider>
  </StrictMode>
);
