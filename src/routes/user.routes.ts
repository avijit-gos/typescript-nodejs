/** @format */

import express from "express";
import {
  getUserdata,
  loginUser,
  registerUser,
} from "../controller/user.controller";
import { authentication } from "../middleware/authentication";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authentication, getUserdata);
export default router;
