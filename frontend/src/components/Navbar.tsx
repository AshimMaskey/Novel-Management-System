import { Button } from "./ui/button";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <div className="border-b-2 border-border">
        <div className="max-w-5xl flex items-center justify-between mx-auto">
          <div>
            <img className="h-14 w-auto" src={logo} alt="" />
          </div>
          <div>
            <ul className="flex gap-x-10">
              <li>Home</li>
              <li>Browse</li>
              <li>Search</li>
            </ul>
          </div>
          <div>
            <Button variant={"default"}>Sign Up</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
