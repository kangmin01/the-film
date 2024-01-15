import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../lib/connectDB";
import bcrypt from "bcrypt";
import User from "@/models/User";

export async function POST(req: NextRequest, res: Response) {
  await connectDB();

  const form = await req.formData();
  const avatarUrl = form.get("avatarUrl");
  const username = form.get("username");
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const password2 = form.get("password2");

  if (!avatarUrl || !username || !email || !password || !password2) {
    return NextResponse.json(
      { message: "Fill in the fields." },
      { status: 422 }
    );
  }
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return NextResponse.json(
      { message: "Username already exists." },
      { status: 422 }
    );
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return NextResponse.json(
      { message: "Email already exists." },
      { status: 422 }
    );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  if (password !== password2) {
    return NextResponse.json(
      { message: "Password confirmation does not match." },
      { status: 422 }
    );
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      {
        message:
          "Password must be at least 6 characters long and include both letters and numbers.",
      },
      { status: 422 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      avatarUrl,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return NextResponse.json({
      message: "You've successfully signed up. Enjoy!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
