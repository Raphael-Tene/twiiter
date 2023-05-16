import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const twiitRouter = createTRPCRouter({
  //   procedure to fetch twiits
  infiniteFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user?.id;
      const data = await ctx.prisma.twiit.findMany({
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select: { likes: true } },
          likes:
            currentUserId == null
              ? false
              : { where: { userId: currentUserId } },

          user: {
            select: { name: true, id: true, image: true },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (data.length > limit) {
        const nextItem = data.pop();

        if (nextItem != null) {
          nextCursor = {
            id: nextItem.id,
            createdAt: nextItem.createdAt,
          };
        }
      }

      return {
        twiits: data.map((twiit) => {
          return {
            id: twiit.id,
            content: twiit.content,
            createdAt: twiit.createdAt,
            likesCount: twiit._count.likes,
            user: twiit.user,
            isLikedByMe: twiit.likes?.length > 0,
          };
        }),
        nextCursor,
      };
    }),
  // procedure to create new twiit
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      return await ctx.prisma.twiit.create({
        data: { content, userId: ctx.session.user.id },
      });
    }),
});
