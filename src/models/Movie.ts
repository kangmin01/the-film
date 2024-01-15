import mongoose from "mongoose";
const { Schema } = mongoose;

export const movieSchema = new Schema({
  title: { type: String, required: true },
  posterUrl: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  description: { type: String, required: true },
  rating: { type: Number },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Discussion" }],
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
