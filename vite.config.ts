import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/servicemodule-${env.VITE_APPLICATION}-[hash].js`,
          assetFileNames: `assets/servicemodule-${env.VITE_APPLICATION}-[hash].[ext]`,
          // manualChunks: function manualChunks(id) {
          //   if (id.includes("lucide")) {
          //     return "lucide";
          //   } else if (id.includes("sk-web-gui")) {
          //     return "sk-web-gui";
          //   } else if (id.includes("lottie")) {
          //     return "lottie";
          //   }
          // },
        },
      },
    },
  };
});
