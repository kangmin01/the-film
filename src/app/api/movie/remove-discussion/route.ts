import connectDB from "@/lib/connectDB";
import Discussion from "@/models/Discussion";
import Movie from "@/models/Movie";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await connectDB();

  const { id } = await req.json();

  try {
    await Discussion.findByIdAndDelete(id);
    await Movie.updateOne({ discussions: id }, { $pull: { discussions: id } });
    await User.updateOne({ host: id }, { $pull: { host: id } });

    return NextResponse.json({
      message: "Remove discussion successfully!",
    });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
