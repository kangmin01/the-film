import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import Review from "@/models/Review";

export async function allReviews() {
  await connectDB();

  const Movie = require("@/models/Movie").default;
  const User = require("@/models/User").default;
  try {
    return Review.find().populate("movie").populate("writer").sort("date");
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}

export async function getReview(id: string) {
  await connectDB();

  try {
    const Movie = require("@/models/Movie").default;
    const User = require("@/models/User").default;
    return Review.findById(id).populate("movie").populate("writer");
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}

export async function updateReview(
  id: string,
  rating: string,
  content: string
) {
  await connectDB();

  try {
    await Review.findByIdAndUpdate(id, { rating, content });

    return NextResponse.json({
      message: "Update review successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
