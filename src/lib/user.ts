import User from "@/models/User";
import Review, { reviewSchema } from "@/models/Review";
import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import { CredentialUser, OAuthUser } from "@/types/userTypes";

const generateRandomUsername = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let username = "user-";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  return username;
};

const generateUniqueUsername = async (): Promise<string> => {
  await connectDB();
  const username = generateRandomUsername();

  const exist = await User.exists({ username });

  if (exist) {
    return generateUniqueUsername();
  } else {
    return username;
  }
};

export const getUserByEmail = async (email: string) => {
  await connectDB();

  const user = await User.findOne({ email });

  if (user) {
    return {
      username: user.username,
      image: user.avatarUrl,
      type: user.type,
      id: user._id,
    };
  } else {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  await connectDB();

  const Review = require("@/models/Review").default;
  const Movie = require("@/models/Movie").default;
  const user = await User.findOne({ username }).populate([
    {
      path: "reviews",
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "writer", model: "User" },
        { path: "movie", model: "Movie" },
      ],
    },
    {
      path: "host",
      options: { sort: { date: -1 } },
      populate: [{ path: "movie", model: "Movie" }],
    },
    {
      path: "guest",
      options: { sort: { date: -1 } },
      populate: [{ path: "movie", model: "Movie" }],
    },
  ]);

  if (user) {
    return user;
  } else {
    return null;
  }
};

export async function addUser({ email, image }: OAuthUser) {
  try {
    await connectDB();
    const existied = await User.exists({ email });

    if (!existied) {
      // 존재하지 않는다면 회원가입을 해주고 로그인 상태로 만들어주면 된다.
      const username = await generateUniqueUsername();
      const newUser = new User({
        username,
        email,
        avatarUrl: image,
        socialOnly: true,
      });
      await newUser.save();
    }
    // 존재한다면 그냥 로그인을 해주면 됨, 즉 이 함수에서는 아무것도 안해줘도된다.
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 500 }
    );
  }
}

export async function authorizeUser({ username, password }: CredentialUser) {
  try {
    await connectDB();

    const user = await User.findOne({ username });

    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
