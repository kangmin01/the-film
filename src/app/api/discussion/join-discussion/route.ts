import connectDB from "@/lib/connectDB";
import { joinDiscussion, updateDiscussion } from "@/lib/discussions";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  await connectDB();

  const { id, user } = await req.json();

  return joinDiscussion(id, user) //
    .then((data) => NextResponse.json(data));
}
