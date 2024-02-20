import connectDB from "@/lib/connectDB";
import { getDiscussionDetailById, updateDiscussion } from "@/lib/discussions";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(req: NextRequest, context: Context) {
  return getDiscussionDetailById(context.params.id) //
    .then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest, context: Context) {
  await connectDB();

  const form = await req.formData();
  const subtitle = form.get("subtitle") as string;
  const date = form.get("date") as string;
  const startTime = form.get("startTime") as string;
  const notice = form.get("notice") as string;
  const minHeadcount = Number(form.get("minHeadcount"));
  const maxHeadcount = Number(form.get("maxHeadcount"));
  const meetingUrl = form.get("meetingUrl") as string;
  const data = {
    subtitle,
    date,
    startTime,
    notice,
    minHeadcount,
    maxHeadcount,
    meetingUrl,
  };

  return updateDiscussion(context.params.id, data) //
    .then((data) => NextResponse.json(data));
}
