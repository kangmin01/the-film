import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import Discussion from "@/models/Discussion";

export async function allDiscussions() {
  await connectDB();

  const Movie = require("@/models/Movie").default;
  try {
    return Discussion.find().populate("movie").sort("date");
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}

export async function getDiscussionDetailById(id: string) {
  await connectDB();

  try {
    return Discussion.findById(id).populate("movie");
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}
