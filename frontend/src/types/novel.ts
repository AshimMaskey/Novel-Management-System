export type NovelType = {
  _id: string;
  title: string;
  description: string;
  genres: string[];
  author: {
    _id: string;
    username: string;
  };
  image: string;
  status: "ongoing" | "completed" | string;
  views: number;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};
