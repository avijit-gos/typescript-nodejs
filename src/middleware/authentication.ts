/** @format */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) throw createError.BadRequest("Token not found");
    const verify = await jwt.verify(token, process.env.SECRET || "");
    // if(verify.status === 'inactive') 
    console.log(verify)
  } catch (error) {
    next(error);
  }
};
