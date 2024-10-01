/** @format */

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import CreateError from "http-errors";
import logger from "morgan";

// importing database initialize function
import dbInit from "./config/db.config";
dbInit();

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

import UserRoute from "./routes/user.routes"
app.use("/api/v1/user", UserRoute);

app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(CreateError.NotFound("Page not found"));
});
// Error message
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.PORT || 4040;

app.listen(port, () => console.log(`Server listenig on port:${port}`));
