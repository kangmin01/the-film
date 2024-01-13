import mongoose from "mongoose";
import { UserTypes } from "@/types/userTypes";

const { Schema } = mongoose;

export const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  avatarUrl: { type: String, default: "/image/user.png", required: true },
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

// 일반로그인시 비밀번호 추가해주기
// 일반로그인과 소셜로그인 뭐가 다른 값이냐,,
// if () {
//   userSchema.add({
//     password: {
//       type: String,
//       required: true,
//     },
//   });
// }

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
