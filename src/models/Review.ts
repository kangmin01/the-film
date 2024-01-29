import mongoose from "mongoose";
const { Schema } = mongoose;

export const reviewSchema = new Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
