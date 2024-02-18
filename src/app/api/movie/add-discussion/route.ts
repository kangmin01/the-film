import connectDB from "@/lib/connectDB";
import Discussion from "@/models/Discussion";
import Movie from "@/models/Movie";
import Review from "@/models/Review";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  const form = await req.formData();
  const movie = form.get("movie");
  const subtitle = form.get("subtitle");
  const date = form.get("date");
  const notice = form.get("notice");
  const startTime = form.get("startTime");
  const minHeadcount = form.get("minHeadcount");
  const maxHeadcount = form.get("maxHeadcount");
  const host = form.get("host");
  const meetingUrl = form.get("meetingUrl");

  try {
    const discussion = new Discussion({
      movie,
      subtitle,
      date,
      notice,
      startTime,
      minHeadcount,
      maxHeadcount,
      host,
      meetingUrl,
    });
    await discussion.save();
    await Movie.findByIdAndUpdate(movie, {
      $push: {
        discussions: discussion._id,
      },
    });
    await User.findByIdAndUpdate(host, {
      $push: {
        host: discussion._id,
      },
    });
    return NextResponse.json({
      message: "Add discussion successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
