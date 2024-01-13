import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export function createToken(payload: Object) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1m",
  });
}

export function createRefreshToken() {
  return jwt.sign({}, process.env.JWT_SECRET_KEY!, {
    expiresIn: "14d",
  });
}

export function verify(access: string) {
  let decoded = null;

  try {
    // userId를 가지고온다!
    decoded = jwt.verify(access, process.env.JWT_SECRET_KEY!) as JwtPayload; // {username: 'test', userId: '659c3810ba31219761fc128b',iat: ,exp:, }
    return NextResponse.json({
      ok: true,
      userId: decoded.userId,
    });
  } catch (error) {
    return NextResponse.json({
      ok: false,
    });
  }
}

// export async function refreshVerify(refresh: string, userId: string) {
//   try {
//     // const refreshDB =
//     //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDQ4MDA3MjQsImV4cCI6MTcwNjAxMDMyNH0.Wk6tMoSNbElMoaYJ9HyUTFKCQQCG5IsGC_BwKTqUcBw";
//     const refreshToken = await User.findById(userId)
//       .select("refreshToken -_id")
//       .exec();
//     console.log(refreshToken);
//     const refreshDB = refreshToken?.refreshToken;
//     if (refresh === refreshDB) {
//       jwt.verify(refreshDB, process.env.JWT_SECRET_KEY!);
//       return NextResponse.json({
//         ok: true,
//       });
//     } else {
//       return NextResponse.json({
//         ok: false,
//       });
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: JSON.stringify(error) },
//       { status: 500 }
//     );
//   }
// }
