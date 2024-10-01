/** @format */
import mongoose from "mongoose";
interface IUser {
  readonly _id: mongoose.Types.ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export default IUser