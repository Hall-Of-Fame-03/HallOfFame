import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        achievementDescription: z.string(),
        category: z.string(),
        issuerOrganization: z.string(),
        issueDate: z.string(),
        tag: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        achievementDescription,
        category,
        issuerOrganization,
        issueDate,
        tag,
        image,
      } = input;
      const { user } = ctx.session;
      if (!user.email) {
        throw new Error("User not found");
      }
      const issuedate = new Date(issueDate);
      const tags = tag.split(",");
      const newPost = await ctx.prisma.post.create({
        data: {
          title,
          achievementDescription,
          category,
          issuerOrganization,
          imageurl: image,
          User: {
            connect: {
              email: user.email,
            },
          },
          issueDate: issuedate,
          tags,
          public: true,
        },
      });

      return {
        success: true,
        message: "Post created successfully",
        post: newPost,
      };
    }),

  getPosts: protectedProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
        useremail: z.boolean().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      let { page, limit } = input;
      if (page < 1) {
        page = 1;
      }
      if (limit < 1) {
        limit = 1;
      }
      const total = await ctx.prisma.post.count({
        where: {
          public: true,
        },
      });
      if (input.useremail) {
        const allPosts = await ctx.prisma.post.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            public: true,
            User: {
              email: {
                equals: ctx.session.user.email,
              },
            },
          },
          include: {
            User: true,
            Like: {
              select: {
                Post: true,
                User: {
                  select: {
                    email: true,
                    followedBy: true,
                    following: true,
                  },
                },
                id: true,
                postId: true,
                userId: true,
              },
            },
            Comment: true,
          },
        });
        const hasNext = total > page * limit;
        const hasPrevious = page > 1;
        return {
          success: true,
          message: "Posts fetched successfully",
          posts: allPosts,
          hasNext,
          hasPrevious,
        };
      } else {
        const allPosts = await ctx.prisma.post.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            public: true,
          },
          include: {
            User: true,
            Like: {
              select: {
                Post: true,
                User: {
                  select: {
                    email: true,
                    followedBy: true,
                    following: true,
                  },
                },
                id: true,
                postId: true,
                userId: true,
              },
            },
            Comment: true,
          },
        });
        const hasNext = total > page * limit;
        const hasPrevious = page > 1;
        return {
          success: true,
          message: "Posts fetched successfully",
          posts: allPosts,
          hasNext,
          hasPrevious,
        };
      }
    }),

  addliketopost: protectedProcedure
    .input(
      z.object({
        postid: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { postid } = input;
      const { user } = ctx.session;
      if (!user.email) {
        throw new Error("User not found");
      }
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postid,
        },
      });
      if (!post) {
        throw new Error("Post not found");
      }

      const like = await ctx.prisma.like.create({
        data: {
          Post: {
            connect: {
              id: postid,
            },
          },
          User: {
            connect: {
              email: user.email,
            },
          },
        },
      });
      return {
        success: true,
        message: "Like added successfully",
      };
    }),

  removelikefrompost: protectedProcedure
    .input(
      z.object({
        likeid: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { likeid } = input;
      const { user } = ctx.session;
      if (!user.email) {
        throw new Error("User not found");
      }
      const like = await ctx.prisma.like.findUnique({
        where: {
          id: likeid,
        },
      });
      if (!like) {
        throw new Error("Like not found");
      }
      const removelike = await ctx.prisma.like.delete({
        where: {
          id: likeid,
        },
      });
      return {
        success: true,
        message: "Like removed successfully",
      };
    }),

  getAllCommentOfPost: protectedProcedure
    .input(
      z.object({
        postid: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { postid } = input;
      if (!ctx.session.user.email) {
        throw new Error("User not found");
      } else {
        const comments = await ctx.prisma.comment.findMany({
          where: {
            postId: postid,
          },
          include: {
            User: {
              select: {
                email: true,
                name: true,
                image: true,
              },
            },
          },
        });
        return {
          success: true,
          message: "Comments fetched successfully",
          comments,
        };
      }
    }),
});
