import { DiscussionStatus } from "@/types/discussionTypes";
import mongoose from "mongoose";
const { Schema } = mongoose;

export const discussionSchema = new Schema({
  subtitle: { type: String, required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  notice: { type: String, required: true },
  minHeadcount: { type: Number, required: true },
  maxHeadcount: { type: Number, required: true },
  status: {
    type: String,
    default: DiscussionStatus.Recruiting,
    required: true,
  },
  meetingUrl: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guest: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Discussion =
  mongoose.models.Discussion || mongoose.model("Discussion", discussionSchema);

export default Discussion;
