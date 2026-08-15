// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

/**
 * Vite 8 + TanStack Start can skip SSR middleware when `instanceof RunnableDevEnvironment`
 * fails across ESM boundaries, which surfaces as a blank "Cannot GET /".
 * @see https://github.com/TanStack/router/issues/7614
 */
function ensureTanstackStartSsrMiddleware(): Plugin {
  return {
    name: "ensure-tanstack-start-ssr-middleware",
    configureServer(viteDevServer) {
      return async () => {
        const serverEnv = viteDevServer.environments.ssr as
          | {
              runner?: {
                import: (id: string) => Promise<{ default: { fetch: (req: Request) => Promise<Response> } }>;
                clearCache?: () => void;
              };
              moduleGraph?: { invalidateAll: () => void };
            }
          | undefined;
        const clientEnv = viteDevServer.environments.client as
          | { devEngine?: { ensureLatestBuildOutput?: () => Promise<void> } }
          | undefined;

        // Feature-check (not instanceof) so dual Vite module graphs still work.
        if (!serverEnv?.runner?.import) return;

        const { NodeRequest, sendNodeResponse } = await import("srvx/node");

        viteDevServer.middlewares.use(async (req, res) => {
          if (req.originalUrl) req.url = req.originalUrl;
          const webReq = new NodeRequest({ req, res });
          try {
            const serverRunner = serverEnv.runner!;
            if (viteDevServer.config.experimental.bundledDev) {
              await clientEnv?.devEngine?.ensureLatestBuildOutput?.();
              serverEnv.moduleGraph?.invalidateAll();
              serverRunner.clearCache?.();
            }
            const mod = await serverRunner.import("virtual:tanstack-start-server-entry");
            return sendNodeResponse(res, await mod.default.fetch(webReq));
          } catch (error) {
            console.error(error);
            try {
              viteDevServer.ssrFixStacktrace(error as Error);
            } catch {
              // ignore stacktrace fix failures
            }
            return sendNodeResponse(
              res,
              new Response("Internal Server Error", {
                status: 500,
                headers: { "Content-Type": "text/plain; charset=utf-8" },
              }),
            );
          }
        });
      };
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [ensureTanstackStartSsrMiddleware()],
  },
});
