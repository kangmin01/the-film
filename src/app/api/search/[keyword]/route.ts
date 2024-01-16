import { searchMoives } from "@/lib/movie";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  return searchMoives(context.params.keyword) //
    .then((data) => NextResponse.json(data));
}
