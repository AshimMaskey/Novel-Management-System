export interface ReviewType {
  _id: string;
  novel: string;
  user: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type GetReviewType = {
  _id: string;
  novel: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    username: string;
    profileImg: string;
  };
  __v: number;
};

export interface CreateReviewType {
  rating: number;
  review: string;
}
