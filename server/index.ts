import express from "express";
import { middleware, mergeRouters, publicProcedure, router } from "./lib/trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
import log from "./utils/log";
import { initDb } from "./lib/db";

const app = express();
const PORT = 3001;
const LAG = 250;

import { userRouter } from "./router/user";
import User from "./schemas/User";

const myMiddleware = middleware(({ ctx, next }) => {
  console.log("ctx: ", ctx);
  return next();
});

const loggerProcedure = publicProcedure.use(myMiddleware);

const appRouter = router({
  user: userRouter,
  hello: loggerProcedure
    .input(
      z.object({
        message: z.string(),
        user: z.string(),
      })
    )
    .query(({ input }) => {
      return `hello from ${input.user}`;
    }),
});

(async () => {
  const caller = appRouter.createCaller({});
  // try {
  //   const a = await caller.user.create({
  //     username: "sq",
  //     password: "jarfdsfdsfds",
  //     confirmPassword: "epicfdsfsdfds",
  //   });
  //   console.log(a);
  // } catch (error) {
  //   log.error(error);
  // }
  // const result = await caller.user.getUser(1);
  // const result = await caller.hello({ message: "epic", user: "wowman" });

  // await User.create({
  //   egg: null,
  //   password: "dsqdsqdsqdlmqdlmdqlms",
  //   username: "epdis",
  // });
})();

export type AppRouter = typeof appRouter;

// express middlewares
app.use(cors());
app.use((_, __, next) => setTimeout(next, LAG));
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

initDb();
app.listen(PORT, () => log.info(`${log.SERVER}: listening at port ${PORT}`));
