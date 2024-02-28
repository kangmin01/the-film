import { NextResponse } from "next/server";
import connectDB from "./connectDB";
import Discussion from "@/models/Discussion";
import { DiscussionStatus, UpdateDiscussion } from "@/types/discussionTypes";
import User from "@/models/User";

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
    const Movie = require("@/models/Movie").default;
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

export async function joinDiscussion(id: string, userId: string) {
  await connectDB();

  try {
    await Discussion.findByIdAndUpdate(id, { $push: { guest: userId } });
    await User.findByIdAndUpdate(userId, { $push: { guest: id } });

    return NextResponse.json({
      message: "Join discussion successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export const updateDiscussionStatus = async () => {
  await connectDB();

  const discussions = await Discussion.find({
    status: DiscussionStatus.Recruiting,
  });

  discussions.forEach(async (discussion) => {
    const discussionDateTime = new Date(
      `${discussion.date.toISOString().split("T")[0]}T${discussion.startTime}`
    );

    if (discussionDateTime < new Date()) {
      await Discussion.updateOne(
        { _id: discussion._id },
        { $set: { status: DiscussionStatus.Completed } }
      );
    }
  });
};
