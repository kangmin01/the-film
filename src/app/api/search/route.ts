import { searchMoives } from "@/lib/movie";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return searchMoives().then((data) => NextResponse.json(data));
}
