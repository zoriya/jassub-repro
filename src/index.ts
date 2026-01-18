import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/": index,
  },

  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/jassub/")) {
      const filePath = "node_modules/jassub/dist/wasm" + url.pathname.replace("/jassub", "");
      const file = Bun.file(filePath);

      if (await file.exists()) {
        return new Response(file);
      }
    }
    return new Response("404 Not Found", { status: 404 });
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
