import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";

// Vercel sets VERCEL=1 during its build; other builds produce a plain Node server.
const onVercel = Boolean(process.env["VERCEL"]);

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    define: Object.fromEntries(
      Object.entries(env).map(([k, v]) => [`import.meta.env.${k}`, JSON.stringify(v)]),
    ),
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
    server: { host: "::", port: 8080 },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart({
        importProtection: { behavior: "error", client: { files: ["**/server/**"], specifiers: ["server-only"] } },
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        server: { entry: "server" },
      }),
      ...(command === "build"
        ? [
            nitro(
              onVercel
                ? {
                    preset: "vercel",
                    output: {
                      dir: ".vercel/output",
                      serverDir: ".vercel/output/functions/__server.func",
                      publicDir: ".vercel/output/static",
                    },
                  }
                : { preset: "node-server" },
            ),
          ]
        : []),
      viteReact(),
    ],
  };
});
