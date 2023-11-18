import chalk from "chalk";
import { connectToDatabase } from "./database/index.js";
import { startServer } from "./server/app.js";
import "./server/index.js";

const port = process.env.PORT ?? 1914;

if (!process.env.MONGODB_URL) {
  console.log(chalk.red("Missing MongoDBconnection"));
  process.exit();
}

const mongoUrl = process.env.MONGODB_URL;

await connectToDatabase(mongoUrl);
startServer(+port);
