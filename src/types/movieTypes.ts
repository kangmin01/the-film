import { Discussion } from "./discussionTypes";
import { Review } from "./reviewTypes";

export type SearchMovie = {
  _id: string;
  title: string;
  posterUrl: string;
  director: string;
  releaseDate: string;
  description: string;
  rating: Array<number>;
  reviews: Review[];
  discussions: Discussion[];
};
