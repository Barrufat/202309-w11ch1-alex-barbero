import "dotenv/config";
import express from "express";
import chalk from "chalk";
import helmet from "helmet";

export const app = express();
app.disable("x-powered-by");
app.use(helmet());

export const startServer = (port: number) => {
  app.listen(port, () => {
    console.log(
      chalk.green(`¡Oh yeah! Serve listening in port http://localhost:${port}`),
    );
  });
};
