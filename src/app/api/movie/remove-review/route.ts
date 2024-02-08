import connectDB from "@/lib/connectDB";
import Movie from "@/models/Movie";
import Review from "@/models/Review";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await connectDB();

  const { id } = await req.json();

  try {
    await Review.findByIdAndDelete(id);
    await User.updateOne({ reviews: id }, { $pull: { reviews: id } });
    await Movie.updateOne({ reviews: id }, { $pull: { reviews: id } });

    return NextResponse.json({
      message: "Remove review successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
