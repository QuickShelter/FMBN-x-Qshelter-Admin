//import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// const vendorList = ["react", "react-router-dom", "react-dom"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //   sentryVitePlugin({
    //   org: "quick-shelter",
    //   project: "quick-shelter-admin-dashboard"
    // })
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  // Manual Chunking
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // vendor: vendorList,
          // ...renderChunks(dependencies),
          pdfMake: ["pdfmake"],
          reactToPdf: ["react-to-pdf"],
          reactHookForm: ['react-hook-form'],
          useHooks: ['@uidotdev/usehooks'],
          visxGroup: ['@visx/group'],
          visxTooltip: ['@visx/tooltip'],
          visxResponsive: ['@visx/responsive'],
          visxScale: ['@visx/scale']
        },
      },
    },
  },
  // End Manual Chunking
});

// Manual Chunking
// Use this to discover the bloated module

/*
import { dependencies } from "./package.json";
*/
/**
 * Separate out the vendor deps
 * Use this to figure out bundles that need to be splitted out
 * @param deps
 * @returns
 */
/*
function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (vendorList.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}
// End Manual Chunking
*/
