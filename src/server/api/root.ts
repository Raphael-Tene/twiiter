import { createTRPCRouter } from "@/server/api/trpc";
import { exampleRouter } from "@/server/api/routers/example";
import { twiitRouter } from "./routers/twiits";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  twiit: twiitRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
