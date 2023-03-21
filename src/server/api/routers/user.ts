import { z } from "zod";
import bcrypt from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        avatar: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, avatar } = input;
      // check if the user already exists
      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        throw new Error("User already exists");
      } else {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create the user
        const newUser = await ctx.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            image: avatar,
            name: input.name,
          },
        });
        return {
          id: newUser.id,
          success: true,
          message: "User created successfully",
        };
      }
    }),

  getUserProfilePhoto: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { email } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { email },
      });
      if (!user) throw new Error("User not found");
      return user;
    }),

  createCommentToPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        comment: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { postId, comment } = input;
      if (!ctx.session.user.email) throw new Error("User not found");
      const createcomment = await ctx.prisma.comment.create({
        data: {
          Post: {
            connect: {
              id: postId,
            },
          },
          User: {
            connect: {
              email: ctx.session.user.email,
            },
          },
          comment,
        },
      });
      return {
        id: createcomment.id,
        success: true,
        message: "Comment created successfully",
      };
    }),

  listOfFollowers: protectedProcedure
    .input(
      z.object({
        email: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      let { email } = input;
      if (!email) {
        email = ctx.session.user.email || "";
      }
      const user = await ctx.prisma.user.findUnique({
        where: { email },
        select: {
          followedBy: {
            select: {
              email: true,
              name: true,
              image: true,
            },
          },
          following: {
            select: {
              email: true,
              name: true,
              image: true,
            },
          },
        },
      });
      if (!user) throw new Error("User not found");
      return user;
    }),

  followUser: protectedProcedure
    .input(
      z.object({
        userEmail: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = input;
      const { user } = ctx.session;
      if (!user.email) throw new Error("User not found");
      const olduser = await ctx.prisma.user.findUnique({
        where: { email: userEmail },
      });
      const followUser = await ctx.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          following: {
            connect: {
              email: userEmail,
            },
          },
        },
      });
      const followedUser = await ctx.prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          followedBy: {
            connect: {
              email: user.email,
            },
          },
        },
      });
      return {
        success: true,
        message: "User followed successfully",
      };
    }),

  unfollowUser: protectedProcedure
    .input(
      z.object({
        userEmail: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userEmail } = input;
      const { user } = ctx.session;
      if (!user.email) throw new Error("User not found");
      const olduser = await ctx.prisma.user.findUnique({
        where: { email: userEmail },
      });
      const followUser = await ctx.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          following: {
            disconnect: {
              email: userEmail,
            },
          },
        },
      });
      const followedUser = await ctx.prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          followedBy: {
            disconnect: {
              email: user.email,
            },
          },
        },
      });
      return {
        success: true,
        message: "User unfollowed successfully",
      };
    }),
});
