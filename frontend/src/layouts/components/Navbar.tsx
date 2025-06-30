import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { BsBrowserSafari } from "react-icons/bs";
import { FaPenNib, FaUserShield } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";
import NotificationBell from "./NotificationBell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosPersonAdd } from "react-icons/io";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useFetchAllNotificationsQuery } from "@/features/notifications/notificationApi";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  //notification count
  const { data } = useFetchAllNotificationsQuery();

  return (
    <>
      <div className="border-b-2 py-1 border-border">
        <div className="max-w-5xl flex items-center justify-between mx-auto">
          <div className="ml-5 md:ml-0">
            <Link to="/">
              <img
                className="h-14 w-auto hover:cursor-pointer"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex gap-x-10 font-extralight">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-primary flex items-center gap-x-3 duration-300 ${
                      isActive ? "text-primary" : ""
                    }`
                  }
                  to="/browse"
                >
                  <span className="text-xl">
                    <BsBrowserSafari />
                  </span>
                  Browse
                </NavLink>
              </li>
              <li>
                {user?.role === "admin" ? (
                  <NavLink
                    className={({ isActive }) =>
                      `hover:text-primary flex items-center gap-x-3 duration-300 ${
                        isActive ? "text-primary" : ""
                      }`
                    }
                    to="/admin"
                  >
                    <span className="text-2xl">
                      <FaUserShield />
                    </span>
                    Admin
                  </NavLink>
                ) : user?.role === "reader" || user === null ? (
                  <NavLink
                    className={({ isActive }) =>
                      `hover:text-primary flex items-center gap-x-3 duration-300 ${
                        isActive ? "text-primary" : ""
                      }`
                    }
                    to="/join"
                  >
                    <span className="text-2xl">
                      <IoIosPersonAdd />
                    </span>
                    Author
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `hover:text-primary flex items-center gap-x-3 duration-300 ${
                        isActive ? "text-primary" : ""
                      }`
                    }
                    to="/create"
                  >
                    <span className="text-xl">
                      <FaPenNib />
                    </span>
                    Create
                  </NavLink>
                )}
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `hover:text-primary flex items-center gap-x-3 duration-300 ${
                      isActive ? "text-primary" : ""
                    }`
                  }
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
          <div className="hidden md:flex items-center gap-x-5">
            <div className="text-2xl hover:text-primary hover:cursor-pointer">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : ""}`
                }
                to="/search"
              >
                <FiSearch />
              </NavLink>
            </div>
            <div className="text-2xl hover:text-primary hover:cursor-pointer">
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : ""}`
                }
                to="/notifications"
              >
                <NotificationBell count={data?.length} />
              </NavLink>
            </div>
            <div>
              {" "}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <Sun className="size-6 dark:hidden" />
                <Moon className="size-6 hidden dark:block" />
              </Button>
            </div>
            {isAuthenticated ? (
              <div className="hover:cursor-pointer">
                <Link to="/profile">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <Button className="font-semibold" variant={"default"}>
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden mr-5 text-3xl hover:cursor-pointer">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <RxHamburgerMenu />
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <div className="flex mx-3 flex-col gap-2 mt-10">
                  <NavLink to="/browse" onClick={() => setOpen(false)}>
                    {({ isActive }) => (
                      <Button
                        variant="ghost"
                        className={`justify-start gap-3 w-full ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        <span className="text-xl">
                          <BsBrowserSafari />
                        </span>
                        Browse
                      </Button>
                    )}
                  </NavLink>

                  <NavLink to="/create" onClick={() => setOpen(false)}>
                    {({ isActive }) => (
                      <Button
                        variant="ghost"
                        className={`justify-start gap-3 w-full ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        <span className="text-xl">
                          <FaPenNib />
                        </span>
                        Create
                      </Button>
                    )}
                  </NavLink>

                  <NavLink to="/bookmarks" onClick={() => setOpen(false)}>
                    {({ isActive }) => (
                      <Button
                        variant="ghost"
                        className={`justify-start gap-3 w-full ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        <span className="text-xl">
                          <IoBookmarks />
                        </span>
                        Bookmarks
                      </Button>
                    )}
                  </NavLink>

                  <NavLink to="/search" onClick={() => setOpen(false)}>
                    {({ isActive }) => (
                      <Button
                        variant="ghost"
                        className={`justify-start gap-3 w-full ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        <span className="text-xl">
                          <FiSearch />
                        </span>
                        Search
                      </Button>
                    )}
                  </NavLink>

                  <NavLink to="/notifications" onClick={() => setOpen(false)}>
                    {({ isActive }) => (
                      <Button
                        variant="ghost"
                        className={`justify-start gap-3 w-full ${
                          isActive ? "text-primary" : ""
                        }`}
                      >
                        <NotificationBell count={2} />
                        Notifications
                      </Button>
                    )}
                  </NavLink>

                  <Button
                    variant="ghost"
                    className="justify-start gap-3 w-full"
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                  >
                    <Sun className="size-5 dark:hidden" />
                    <Moon className="size-5 hidden dark:block" />
                    Toggle Theme
                  </Button>

                  <Link to="/login">
                    <Button
                      className="w-full mt-2"
                      onClick={() => setOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
