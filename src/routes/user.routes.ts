/** @format */

import express from "express";
import {
  deleteUserProfile,
  getUserdata,
  loginUser,
  registerUser,
  updateProfile,
} from "../controller/user.controller";
import authentication from "../middleware/authentication";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authentication, getUserdata);
router.put("/update", authentication, updateProfile);
router.patch("/delete", authentication, deleteUserProfile);
export default router;
