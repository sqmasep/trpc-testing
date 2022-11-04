import { router, publicProcedure, middleware } from "../lib/trpc";
import { z } from "zod";
import User from "../schemas/User";
import bcrypt from "bcrypt";
import { user } from "../formSchemas";
import log from "../utils/log";
import { TRPCError } from "@trpc/server";

const isLogged = middleware(({ ctx, next }) => {
  // if (!ctx.session?.user?.email) {
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //   });
  // }
  return next();
});

export const userRouter = router({
  create: publicProcedure
    .input(user.schema)
    .mutation(async ({ input: { username, password } }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.find({ username });
      if (user.length) {
        log.error(`<user.create> ${log.MONGODB}: Username already exists`);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists",
        });
      }
      await User.create({ username, password: hashedPassword });
      log.success("<user.create> User created successfully");
      return `inséré ${username}`;
    }),
  getUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await User.find({ username: input }).select("-password");
    log(user);
    return user;
  }),
});
