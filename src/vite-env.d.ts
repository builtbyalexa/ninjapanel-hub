/// <reference types="vite/client" />

// Allow CSS module imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// Kumo standalone CSS does not ship type declarations — declare it
declare module "@cloudflare/kumo/styles/standalone" {
  // side-effect import only
}
