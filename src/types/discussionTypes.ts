import { SearchMovie } from "./movieTypes";

export enum DiscussionStatus {
  Recruiting = "Recruiting",
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
  status: string;
};

export type UpdateDiscussion = {
  subtitle: string;
  date: string;
  notice: string;
  startTime: string;
  minHeadcount: number;
  maxHeadcount: number;
  meetingUrl: string;
};

export type DiscussionState = {
  subtitle?: string;
  date?: string;
  startTime?: string;
  notice?: string;
  minHeadcount?: number;
  maxHeadcount?: number;
  meetingUrl?: string;
};
