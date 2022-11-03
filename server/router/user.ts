import { router, publicProcedure } from "../lib/trpc";
import { z } from "zod";
import User from "../schemas/User";
import bcrypt from "bcrypt";
import { user } from "../formSchemas";
import log from "../utils/log";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  create: publicProcedure
    .input(user.schema)
    .mutation(async ({ input: { username, password } }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ username, password: hashedPassword });
        log.success("User created successfully");
        return `inséré ${username}`;
      } catch (error) {
        log.error(error);
      }
    }),
  getUser: publicProcedure.input(z.string()).query(({ input }) => {
    return User.findById(input);
  }),
});
