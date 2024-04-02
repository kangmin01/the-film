import { allReviews } from "@/lib/reviews";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return allReviews() //
    .then((data) => NextResponse.json(data));
}
