import { allDiscussions } from "@/lib/discussions";
import { NextResponse } from "next/server";

export async function GET() {
  return allDiscussions() //
    .then((data) => NextResponse.json(data));
}
