export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    profileImg?: string;
    role?: string;
  };
  novel: string;
  chapter: string;
  content: string;
  spoiler: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentPayload {
  novelId: string;
  chapterId: string;
  content: string;
  spoiler: boolean;
}

export interface UpdateCommentPayload {
  id: string;
  content?: string;
  spoiler?: boolean;
}
