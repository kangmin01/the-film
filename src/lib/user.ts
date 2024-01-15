import User from "@/models/User";
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

export const getUserFromDB = async (email: string) => {
  const user = await User.findOne({ email });

  if (user) {
    return { username: user.username, image: user.avatarUrl, type: user.type };
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
