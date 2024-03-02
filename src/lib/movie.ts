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

    return Movie.find(query).sort({ _id: -1 });
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
        options: { sort: { date: -1 } },
        populate: {
          path: "movie",
          model: "Movie",
        },
      })
      .populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: "writer",
            model: "User",
          },
          {
            path: "movie",
            model: "Movie",
          },
        ],
      });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data from DB" },
      { status: 500 }
    );
  }
}
