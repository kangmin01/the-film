import { getMovieDetailById, searchMoives } from "@/lib/movie";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(req: NextRequest, context: Context) {
  return getMovieDetailById(context.params.id) //
    .then((data) => NextResponse.json(data));
}
