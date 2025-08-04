import { Button } from "@/components/ui/button";
import profile from "@/assets/avatar.png";
import { useFetcchAuthorQuery } from "@/features/user/userApi";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";

export function AuthorSection() {
  const { data, isLoading, error } = useFetcchAuthorQuery();
  if (isLoading)
    return (
      <div className="containerBox">
        <Spinner />
      </div>
    );
  if (error) {
    console.log(error);
  }
  return (
    <section className="containerBox mt-14">
      <h3 className="text-2xl font-bold mb-6">✍️ Author Spotlight</h3>
      <div className="max-w-4xl bg-card border p-5 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6">
        <img
          src={data?.profileImg || profile}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-semibold mb-2">{data?.fullName}</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {data?.fullName} is an award-winning novelist celebrated for
            captivating storytelling and richly developed characters. Their
            works explore themes of love, loss, and resilience.
          </p>
          <Link to={`/profile/${data?.username}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
