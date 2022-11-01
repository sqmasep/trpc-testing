import { router, publicProcedure } from "../trpc";
import { z } from "zod";

interface User {
  id: number;
  auth: boolean;
  username: string;
  numberOfFriends: number;
}

const users: User[] = [];

export const userRouter = router({
  create: publicProcedure
    .input(
      z.object({
        username: z.string({ invalid_type_error: "mauvais type :(" }),
      })
    )
    .mutation(({ input: { username } }) => {
      users.push({
        id: users.length + 1,
        auth: true,
        username,
        numberOfFriends: 0,
      });
      console.log("pushed");
      console.log(users);
      return `inséré ${username}`;
    }),
  getUser: publicProcedure.input(z.number().positive()).query(({ input }) => {
    return users.find(u => u.id === input);
  }),
});
