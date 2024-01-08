import { UserTypes } from "@/types/userTypes";
import mongoose from "mongoose";
const { Schema } = mongoose;

export const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  avatarUrl: String,
  email: { type: String, unique: true, required: true },
  password: String,
  socialOnly: { type: Boolean, default: false, required: true },
  type: { type: String, default: UserTypes.user, required: true },
  accessToken: String,
  refreshToken: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  host: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discussion" }],
  guest: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discussion" }],
});

const User = mongoose.model("User", userSchema);

export default User;
