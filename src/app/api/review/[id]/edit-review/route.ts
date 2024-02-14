import connectDB from "@/lib/connectDB";
import { getReview, updateReview } from "@/lib/reviews";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(req: NextRequest, context: Context) {
  return getReview(context.params.id) //
    .then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest, context: Context) {
  await connectDB();

  const form = await req.formData();
  const rating = form.get("rating") as string;
  const content = form.get("content") as string;

  return updateReview(context.params.id, rating, content) //
    .then((data) => NextResponse.json(data));
}
