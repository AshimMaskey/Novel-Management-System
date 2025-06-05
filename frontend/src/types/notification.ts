export interface Notification {
  _id: string;
  message: string;
  type:
    | "follow"
    | "newNovel"
    | "newChapter"
    | "comment"
    | "review"
    | "newUserSignUp";
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  receiver: string;
  sender: {
    _id: string;
    username: string;
  };
  chapter: string | null;
  novel: string | null;
  __v: number;
}

export interface DeleteNotification {
  acknowledged: boolean;
  deletedCount: number;
}

export interface NotificationsDetails {
  typeName: string | null;
  imgSrc: string | null;
}
