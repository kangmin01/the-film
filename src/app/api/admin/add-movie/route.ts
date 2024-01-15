import connectDB from "@/lib/connectDB";
import Movie from "@/models/Movie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  await connectDB();

  const form = await req.formData();
  const title = form.get("title");
  const posterUrl = form.get("posterUrl");
  const director = form.get("director");
  const releaseDate = form.get("releaseDate");
  const description = form.get("description");

  try {
    const movie = new Movie({
      title,
      posterUrl,
      director,
      releaseDate,
      description,
    });
    await movie.save();
    return NextResponse.json({
      message: "Add movie successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
