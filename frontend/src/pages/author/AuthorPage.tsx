import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import cover from "@/assets/profileCover.jfif";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchUserQuery } from "@/features/user/userApi";
import Spinner from "@/components/ui/Spinner";
import getRelativeTime from "@/utils/convertTime";
import { useFetchNovelsByAuthorQuery } from "@/features/novel/novelApi";
import { useEffect } from "react";

const AuthorPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetchUserQuery(username || "");
  const { data: novels, isLoading: loadingAuthor } =
    useFetchNovelsByAuthorQuery(data?._id || "", {
      skip: !data?._id,
    });

  useEffect(() => {
    if (error || data?.role === "reader") {
      console.log(error);
      navigate("/404");
    }
  }, [error, navigate, data]);
  if (isLoading || loadingAuthor)
    return (
      <div className="containerBox">
        <Spinner />
      </div>
    );

  return (
    <div className="containerBox">
      <div className="relative h-64 rounded-b-lg overflow-hidden">
        <img src={cover} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute top-6 left-6 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
          <img
            src={data?.profileImg}
            alt="Author Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-4 left-10 text-white drop-shadow-md">
          <h1 className="text-3xl font-bold">
            {data?.username} <span className="italic text-lg">(AUTHOR)</span>
          </h1>
        </div>
      </div>

      <div className="flex gap-6 mt-6 px-6">
        <div>
          <p className="text-2xl font-semibold">{novels?.length ?? "0"}</p>
          <p className="text-sm text-muted-foreground">Novels Written</p>
        </div>
      </div>

      <div className="px-6 mt-4 text-sm text-muted-foreground">
        <span>📅 Joined: {getRelativeTime(data?.createdAt ?? "")}</span>
      </div>

      <div className="mt-10 px-6">
        <h2 className="text-xl font-semibold mb-4">Original Works</h2>

        {novels && novels.length > 0 ? (
          novels.map((novel) => (
            <Link to={`/novel/${novel._id}`} key={novel._id}>
              <Card key={novel._id} className="mb-4 border-2">
                <CardContent className="p-4 flex gap-4">
                  <img
                    src={novel.image}
                    alt={novel.title}
                    className="w-28 h-40 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{novel.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {novel.genres.map((genre) => (
                        <Badge key={genre} variant="outline">
                          {genre.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-2 text-muted-foreground text-sm line-clamp-3">
                      {novel.description}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Status: {novel.status} • Views:{" "}
                      {novel.views.toLocaleString()} • Rating:{" "}
                      {novel.averageRating.toFixed(1)} ⭐
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground">No novels found.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
