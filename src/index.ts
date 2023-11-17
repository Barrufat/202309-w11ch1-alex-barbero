import { startServer } from "./server/app.js";

const port = process.env.PORT ?? 1984;

startServer(+port);
