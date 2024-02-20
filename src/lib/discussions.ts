import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import Discussion from "@/models/Discussion";
import { UpdateDiscussion } from "@/types/discussionTypes";

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

export async function updateDiscussion(id: string, data: UpdateDiscussion) {
  await connectDB();

  try {
    await Discussion.findByIdAndUpdate(id, data);

    return NextResponse.json({
      message: "Update discussion successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
