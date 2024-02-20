import { getDiscussionDetailById } from "@/lib/discussions";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return getDiscussionDetailById(context.params.id) //
    .then((data) => NextResponse.json(data));
}
