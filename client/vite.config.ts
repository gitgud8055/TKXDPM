import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
const source: string = "http://localhost:3000";
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: source,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/avatars": {
        target: source,
        secure: false,
      },
      "/attachments": {
        target: source,
        secure: false,
      },
    },
  },
});
