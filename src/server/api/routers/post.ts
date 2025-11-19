import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { CommentZ } from "~/types/comment/comment";
import { PostZ } from "~/types/post/post";

export const postRouter = createTRPCRouter({
  queries: createTRPCRouter({
    getInfinitePosts: protectedProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(50).default(10),
          cursor: z.string().nullish(),
          profileId: z.string().optional(),
          onlyBookmarked: z.boolean().optional(),
          hashtag: z.string().optional(),
          orderBy: z.enum(["latest", "trending"]).default("latest"),
        }),
      )
      .query(async ({ ctx, input }) => {
        const { limit, cursor, profileId, onlyBookmarked, hashtag, orderBy } =
          input;

        const where: Prisma.PostWhereInput = { published: true };

        if (profileId) {
          where.profileId = profileId;
        }

        if (onlyBookmarked) {
          where.bookmarks = {
            some: { profileId: ctx.session.user.profileId },
          };
        }

        if (hashtag) {
          where.hashtags = {
            some: {
              hashtag: { name: hashtag },
            },
          };
        }

        const posts = await ctx.db.post.findMany({
          take: limit + 1,
          orderBy:
            orderBy === "trending"
              ? [{ views: "desc" }, { createdAt: "desc" }]
              : { createdAt: "desc" },
          cursor: cursor ? { id: cursor } : undefined,
          skip: cursor ? 1 : 0,
          where,
          include: {
            profile: {
              select: {
                firstName: true,
                lastName: true,
                id: true,
                username: true,
                avatarUrl: true,
                isVerified: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
            likes: {
              where: { profileId: ctx.session.user.profileId },
              select: { profileId: true },
            },
            bookmarks: {
              where: { profileId: ctx.session.user.profileId },
              select: { profileId: true },
            },
          },
        });

        let nextCursor: string | null = null;
        if (posts.length > limit) {
          const next = posts.pop(); // remove the extra
          nextCursor = next!.id;
        }

        return {
          posts: posts.map((post) => ({
            id: post.id,
            content: post.content,
            imageUrls: post.imageUrls,
            createdAt: post.createdAt,
            profile: post.profile,
            likes: post._count.likes,
            comments: post._count.comments,
            views: post.views,
            isLiked: post.likes.length > 0,
            isBookmarked: post.bookmarks.length > 0,
            isOwner: post.profileId === ctx.session.user.profileId,
          })),
          nextCursor,
        };
      }),
  }),

  mutations: createTRPCRouter({
    create: protectedProcedure.input(PostZ).mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          content: input.content,
          profileId: ctx.session.user.profileId,
        },
      });
    }),

    toggleLike: protectedProcedure
      .input(z.object({ postId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const profileId = ctx.session.user.profileId;

        const existingLike = await ctx.db.like.findUnique({
          where: {
            profileId_postId: {
              profileId,
              postId: input.postId,
            },
          },
        });

        if (existingLike) {
          await ctx.db.like.delete({
            where: {
              profileId_postId: {
                profileId,
                postId: input.postId,
              },
            },
          });
          return { isLiked: false };
        } else {
          await ctx.db.like.create({
            data: {
              profileId,
              postId: input.postId,
            },
          });
          return { isLiked: true };
        }
      }),

    toggleBookmark: protectedProcedure
      .input(z.object({ postId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const profileId = ctx.session.user.profileId;

        const existingBookmark = await ctx.db.bookmark.findUnique({
          where: {
            profileId_postId: {
              profileId,
              postId: input.postId,
            },
          },
        });

        if (existingBookmark) {
          await ctx.db.bookmark.delete({
            where: {
              profileId_postId: {
                profileId,
                postId: input.postId,
              },
            },
          });
          return { isBookmarked: false };
        } else {
          await ctx.db.bookmark.create({
            data: {
              profileId,
              postId: input.postId,
            },
          });
          return { isBookmarked: true };
        }
      }),

    delete: protectedProcedure
      .input(z.object({ postId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const profileId = ctx.session.user.profileId;

        const post = await ctx.db.post.findUnique({
          where: { id: input.postId },
          select: { profileId: true },
        });

        if (!post) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
        }

        if (post.profileId !== profileId) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized" });
        }

        await ctx.db.post.delete({
          where: { id: input.postId },
        });

        return { success: true };
      }),
  }),

  getComments: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: { postId: input.postId },
        orderBy: { createdAt: "desc" },
        include: {
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      });

      return comments;
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        content: CommentZ.shape.content,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.create({
        data: {
          content: input.content,
          postId: input.postId,
          profileId: ctx.session.user.profileId,
        },
        include: {
          profile: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      });

      return comment;
    }),
});
