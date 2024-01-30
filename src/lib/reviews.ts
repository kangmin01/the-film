import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import Review from "@/models/Review";

export async function allReviews() {
  await connectDB();

  try {
    return Review.find()
      .populate("movie")
      .populate("writer")
      .sort("-createdAt");
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}
