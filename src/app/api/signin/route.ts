import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { createRefreshToken, createToken } from "@/util/jwt";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();

  const form = await req.formData();
  const username = form.get("username") as string;
  const password = form.get("password") as string;

  if (username.length === 0 || password.length === 0) {
    return NextResponse.json(
      { message: "Fill in the fields" },
      { status: 422 }
    );
  }
  const user = await User.findOne({ username });

  if (!user) {
    return NextResponse.json(
      { message: "That username does not exist." },
      { status: 422 }
    );
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return NextResponse.json(
      { message: "Confirm your password." },
      { status: 422 }
    );
  }

  // 토큰 발급
  //   const accessToken = createToken({ username, userId: user._id });
  //   const refreshToken = createRefreshToken();

  // refresh 토큰 디비에 저장
  //   await User.findByIdAndUpdate(user._id, { refreshToken });

  //   cookies().set("accessToken", accessToken, {
  //     httpOnly: true,
  //     path: "/",
  //   });
  //   cookies().set("refreshToken", refreshToken, {
  //     httpOnly: true,
  //     path: "/",
  //   });

  try {
    return NextResponse.json({
      username,
      password,
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
