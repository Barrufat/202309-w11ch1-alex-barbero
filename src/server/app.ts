import "dotenv/config";
import express from "express";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("features:server");

export const app = express();
app.disable("x-powered-by");

export const startServer = (port: number) => {
  app.listen(port, () => {
    debug(
      chalk.green(`¡Oh yeah! Serve listening in port http://localhost:${port}`),
    );
  });
};
