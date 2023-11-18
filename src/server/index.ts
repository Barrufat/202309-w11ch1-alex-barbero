import morgan from "morgan";
import express from "express";
import { app } from "./app.js";
import pingRouter from "../features/ping/router/PingRouter.js";
import robotRouter from "../features/robots/router/robotRouter.js";

app.use(express.json());

app.use(morgan("dev"));

app.use("/", pingRouter);

app.use("/robots", robotRouter);
