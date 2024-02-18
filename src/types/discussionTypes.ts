import { SearchMovie } from "./movieTypes";

export enum DiscussionStatus {
  Recruiting = "Recruiting",
  Cancelled = "Cancelled",
  Completed = "Completed",
}

export type Discussion = {
  _id: string;
  movie: SearchMovie;
  subtitle: string;
  date: string;
  notice: string;
  startTime: string;
  minHeadcount: number;
  maxHeadcount: number;
  host: string;
  guest: string[];
  meetingUrl: string;
};
