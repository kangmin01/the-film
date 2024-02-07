import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import Review from "@/models/Review";

export async function allReviews() {
  await connectDB();

  const Movie = require("@/models/Movie").default;
  const User = require("@/models/User").default;
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

export async function getUserReviews(id: string) {
  await connectDB();

  try {
    return Review.findById(id);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}
