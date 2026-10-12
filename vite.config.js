import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
// });

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["dashboard.carerfinderau.com"], // Only allow this host
    host: "0.0.0.0", // Listen on all interfaces, making it accessible externally
    port: 5173, // Set your desired port
    strictPort: true, // Ensure the port is strictly bound
    cors: true, // Enable CORS if necessary for external access
  },
});

//   target: "esnext", // Ensure modern JavaScript syntax is used
//   outDir: "dist", // Define your output directory for production build
