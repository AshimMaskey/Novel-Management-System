import { useGetChapterCountQuery } from "@/features/chapter/chapterApi";

const ChapterCount = ({ novelId }: { novelId: string }) => {
  const { data, isLoading, error } = useGetChapterCountQuery(novelId ?? "");
  if (isLoading) return 0;
  console.log(data);
  if (error) {
    console.log(error);
    return 0;
  }
  return <div>{data?.chapterCount}</div>;
};

export default ChapterCount;
