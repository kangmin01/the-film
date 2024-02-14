import connectDB from "@/lib/connectDB";
import Movie from "@/models/Movie";
import Review from "@/models/Review";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    await Movie.findByIdAndUpdate(movie, {
      $push: {
        rating: rating,
        reviews: review._id,
      },
    });

    await User.findByIdAndUpdate(writer, {
      $push: {
        reviews: review._id,
      },
    });

    return NextResponse.json({
      message: "Add review successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
