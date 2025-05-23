export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData extends LoginData {
  email: string;
  fullName: string;
}

export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  profileImg: string;
  coverImg: string;
  bookmarks: string[];
  status: boolean;
  role: "reader" | "admin" | "author";
  bio: string;
}

export interface LogoutResponse {
  message: string;
}

export interface GetUser extends User {
  followers: string[];
  following: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
