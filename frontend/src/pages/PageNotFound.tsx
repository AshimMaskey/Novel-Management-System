import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="flex items-center py-30 ">
      <div className="container flex flex-col items-center ">
        <div className="flex flex-col gap-6 max-w-md text-center">
          <h2 className=" text-9xl italic ">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <Link to="/">
            <Button>Back to homepage </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
