import chalk from "chalk";
import mongoose from "mongoose";

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", false);
    console.log(chalk.blue("Connected to database"));
  } catch {
    console.log(chalk.red("Not connected to database"));
  }
};
