import { startServer } from "./server/app.js";
import "./server/index.js";

const port = process.env.PORT ?? 1984;

startServer(+port);
