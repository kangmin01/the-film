import Movie from "@/models/Movie";
import { NextResponse } from "next/server";
import connectDB from "./connectDB";

export async function searchMoives(keyword?: string) {
  await connectDB();

  try {
    const query = keyword
      ? {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { director: { $regex: keyword, $options: "i" } },
          ],
        }
      : {};

    return Movie.find(query);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}

export async function getMovieDetailById(id: string) {
  await connectDB();

  try {
    return Movie.findById(id);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}
