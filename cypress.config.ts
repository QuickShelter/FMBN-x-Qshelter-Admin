import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  viewportWidth: 1400,
  viewportHeight: 900,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
