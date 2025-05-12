import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BsBrowserSafari } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";

const Navbar = () => {
  return (
    <>
      <div className="border-b-2 py-1 border-border">
        <div className="max-w-5xl flex items-center justify-between mx-auto">
          <div>
            <Link to="/">
              <img
                className="h-14 w-auto hover:cursor-pointer"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <div>
            <ul className="flex gap-x-10 font-semibold">
              <li>
                <NavLink
                  className="hover:text-primary flex items-center gap-x-3 duration-300"
                  to="/browse"
                >
                  <span className="text-xl">
                    <BsBrowserSafari />
                  </span>
                  Browse
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary flex items-center gap-x-3 duration-300"
                  to="/create"
                >
                  <span className="text-xl">
                    <FaPenNib />
                  </span>
                  Create
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary flex items-center gap-x-3 duration-300"
                  to="/bookmarks"
                >
                  <span className="text-xl">
                    <IoBookmarks />
                  </span>
                  Bookmarks
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <div></div>
            <div></div>
            <div>
              <Button className="font-semibold" variant={"default"}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
