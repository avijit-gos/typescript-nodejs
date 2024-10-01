/** @format */

import mongoose from "mongoose";
import IUser from "../interface/user.interface";
import userModel from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { hashUserPassword } from "../utils/hash.password";
import { generateToken } from "../utils/generate.token";
import { comparePassowrd } from "../utils/compare.password";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, username, email, password } = req.body;
    if (!name) throw createError.BadRequest("User name not found");
    if (!username) throw createError.BadRequest("Username not found");
    if (!email) throw createError.BadRequest("Email not found");
    if (!password) throw createError.BadRequest("Password not found");
    const isUserExists: IUser | null = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserExists && isUserExists.email === email)
      throw createError.BadRequest("Email already taken");
    if (isUserExists && isUserExists.username === username)
      throw createError.BadRequest("Username already taken");
    if (isUserExists && isUserExists.status === "inactive")
      throw createError.BadRequest("User status set as inactive");
    if (isUserExists && isUserExists.status === "restricted")
      throw createError.BadRequest("User status set as restricted");
    if (isUserExists && isUserExists.status === "delete")
      throw createError.BadRequest("User status set as delete");

    //*** Encrypt user password ***//
    const hashPassword: string | undefined = await hashUserPassword(password);
    const newUser = new userModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      username,
      email,
      password: hashPassword,
      status: "active",
    });
    const user: IUser | null = await newUser.save();
    //*** Generate token ***//
    const token: string | null = await generateToken(user);
    res
      .status(201)
      .json({ message: "Register successfull", status: 201, user, token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userInfo, password } = req.body;
    if (!userInfo)
      throw createError.BadRequest("Please provide username or email");
    if (!password) throw createError.BadRequest("Please provide user password");
    const isUserExists: IUser | null = await userModel.findOne({
      $or: [{ email: userInfo }, { username: userInfo }],
    });
    if (!isUserExists) throw createError.BadRequest("User does not exists");

    //*** Compare user password ***//
    const isPassowrdCorrect: boolean = await comparePassowrd(
      password,
      isUserExists.password
    );
    if (!isPassowrdCorrect)
      throw createError.BadRequest("Password is not correct");
    //*** Generate token ***//
    const token: string | null = await generateToken(isUserExists);
    res.status(200).json({
      message: "Login successfull",
      status: 200,
      user: isUserExists,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserdata = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("User id:");
  } catch (error) {
    next(error);
  }
};
