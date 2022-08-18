export type Nullable<T> = T | null;

export interface IUserDetails {
  name?: string;
  login: string;
  avatar_url: string;
  bio?: string;
  blog?: string;
  email?: string;
  twitter_username?: string;
  location?: string;
  number_of_pages: number;
  html_url: string;
}

export interface IRepo {
  name?: string;
  html_url: string;
  description?: string;
  created_at: string;
  languages_url: string;
}
