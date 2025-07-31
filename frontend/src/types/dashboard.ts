export interface AdminDashboardResponse {
  usersCount: number;
  novelsCount: number;
  commentsCount: number;
  authorsCount: number;
  adminCount: number;
  genresCount: number;
}

export interface AuthorDashboardResponse {
  followersCount: number;
  novelsCount: number;
  viewsCount: number;
  reviewsCount: number;
  commentsCount: number;
}
