import connectDB from "@/lib/connectDB";
import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function POST(req: NextRequest, context: Context) {
  await connectDB();

  const form = await req.formData();
  const rating = form.get("rating");
  const content = form.get("content");
  const movie = form.get("movie");
  const writer = form.get("writer");

  try {
    const review = new Review({
      movie,
      writer,
      rating,
      content,
    });
    await review.save();

    return NextResponse.json({
      message: "Add review successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
