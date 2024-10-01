/** @format */

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import IUser from "../interface/user.interface";
dotenv.config();

export const generateToken = async (user: IUser): Promise<string> => {
  const token: string | null = await jwt.sign(
    {
      _id: user._id,
      status: user.status,
    },
    process.env.SECRET || "",
    { expiresIn: "10d" }
  );
  return token;
};
