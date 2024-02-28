import { Discussion } from "./discussionTypes";
import { Review } from "./reviewTypes";

export enum UserTypes {
  user = "user",
  admin = "admin",
}

export type UserInfo = {
  _id: string;
  username: string;
  avatarUrl: string;
  email: string;
  password: string;
  socialOnly: boolean;
  type: string;
  reviews: Review[];
  host: Discussion[];
  guest: Discussion[];
};

export type UserProfile = {
  avatarUrl: string;
  email: string;
  username: string;
  reviews: Review[];
  host: Discussion[];
  guest: Discussion[];
};

export type NewUser = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export type OAuthUser = {
  email: string;
  image?: string | null;
};

export type CredentialUser = {
  username: string;
  password: string;
};
