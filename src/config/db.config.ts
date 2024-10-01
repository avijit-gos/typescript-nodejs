/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbInit() {
  mongoose.connect(process.env.DB_URL || "");
  mongoose.connection.on("error", () => console.log("DB is not connected"));
  mongoose.connection.on("connected", () => console.log("DB is connected"));
}

export default dbInit;
