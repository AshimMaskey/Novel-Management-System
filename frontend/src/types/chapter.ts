export interface ChapterType {
  _id: string;
  novel: string;
  title: string;
  content: string;
  chapterNumber: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetChapterResponse {
  chapter: ChapterType;
  previousChapter: ChapterType | null;
  nextChapter: ChapterType | null;
}
