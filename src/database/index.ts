import chalk from "chalk";
import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("features:database:main");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);

    debug(chalk.blue("Connected to database"));
  } catch (error) {
    debug(chalk.red("Not connected to database: " + (error as Error).message));
  }
};
