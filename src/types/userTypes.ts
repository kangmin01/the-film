export enum UserTypes {
  user = "user",
  admin = "admin",
}

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
