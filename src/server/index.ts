import morgan from "morgan";
import express from "express";
import cors from "cors";
import { app } from "./app.js";
import pingRouter from "../features/ping/router/PingRouter.js";
import robotRouter from "../features/robots/router/robotRouter.js";
import usersRouter from "../features/user/router/usersRouter.js";

app.use(express.json());

app.use(morgan("dev"));

app.use(cors({ origin: "*" }));

app.use("/", pingRouter);

app.use("/robots", robotRouter);

app.use("/users", usersRouter);
