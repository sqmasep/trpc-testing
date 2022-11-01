import express from "express";
import { middleware, router, publicProcedure } from "./trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
import log from "./lib/logger/log";

const app = express();
const PORT = 3001;
const LAG = 250;

interface Message {
  user: string;
  message: string;
}

// simule une bdd de messages: reset à chaque restart du serv
const messages: Message[] = [];

import { userRouter } from "./router/user";

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
  // const a = await caller.user.create({ username: "sq" });
  // const result = await caller.user.getUser(1);
  // const result = await caller.hello({ message: "epic", user: "wowman" });
  // console.log(result);
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

app.listen(PORT, () => log.info(`Server listening at port ${PORT}`));
