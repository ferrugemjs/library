System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*"
  },

  map: {
    "css": "github:systemjs/plugin-css@0.1.27",
    "incremental-dom": "npm:incremental-dom@0.4.1"
  }
});
