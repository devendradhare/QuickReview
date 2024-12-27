// // Import your manifest file
// import manifest from "./src/manifest.json";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { crx } from "vite-plugin-crx-mv3";
import webExtension from "vite-plugin-web-extension";

export default defineConfig({
  //   plugins: [react(), crx({ manifest })],
  plugins: [
    react(),
    webExtension({
      manifest: "./src/manifest.json",
      additionalInputs: ["src/content.jsx"],
    }),
  ],
});
