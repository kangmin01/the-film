import { allReviews } from "@/lib/reviews";
import { NextResponse } from "next/server";

export async function GET() {
  return allReviews() //
    .then((data) => NextResponse.json(data));
}
