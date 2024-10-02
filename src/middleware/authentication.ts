/** @format */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import createError from "http-errors";

interface CustomRequest extends Request {
  user?: any;
}

const authentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      (req.headers["x-access-token"] as string);

    if (!token) {
      throw createError.Unauthorized("Token is not present");
    } else {
      const isVerify = await jwt.verify(token, process.env.SECRET as string);
      req.user = isVerify;
      if (req.user.status === "inactive")
        throw createError.BadRequest("Profile set as inactive");
      else if (req.user.status === "restricted")
        throw createError.BadRequest("Profile set as restricted");
      else if (req.user.status === "delete")
        throw createError.BadRequest("Profile set as delete");
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default authentication;
