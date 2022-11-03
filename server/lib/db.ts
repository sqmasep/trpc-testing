import mongoose from "mongoose";
import log from "../utils/log";

export const initDb = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/trpc-test");
  mongoose.connection
    .on("connected", () => log.info(`${log.MONGODB}: connected successfully!`))
    .on("error", e => log.error(e));
};
