import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import { connect } from "./utils/db";
import schoolRouter from "./resources/school.router";

export const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/school", schoolRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`Course Req API on ${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
