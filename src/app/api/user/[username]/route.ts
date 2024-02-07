import { getUserByUsername } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { username: string };
};

export async function GET(req: NextRequest, context: Context) {
  return getUserByUsername(context.params.username) //
    .then((data) => NextResponse.json(data));
}
