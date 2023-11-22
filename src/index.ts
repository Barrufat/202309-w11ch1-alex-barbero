import "dotenv/config";
import chalk from "chalk";
import debugCreator from "debug";
import { connectToDatabase } from "./database/index.js";
import { startServer } from "./server/app.js";
import "./server/index.js";
import "./features/user/model/User.js";

const debug = debugCreator("features:root");

const port = process.env.PORT ?? 4000;

if (!process.env.MONGODB_URL) {
  debug(chalk.red("Missing MongoDBconnection"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
