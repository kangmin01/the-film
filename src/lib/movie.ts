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
    const Review = require("@/models/Review").default;
    const User = require("@/models/User").default;
    const Discussion = require("@/models/Discussion").default;
    return Movie.findById(id)
      .populate({
        path: "discussions",
        populate: {
          path: "movie",
          model: "Movie",
        },
      })
      .populate({
        path: "reviews",
        populate: {
          path: "writer",
          model: "User",
        },
      });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}
