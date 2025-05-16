import profileCover from "@/assets/profileCover.jfif";
import avatarImage from "@/assets/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CiUser } from "react-icons/ci";
import EditModal from "./components/EditModal";
const ProfilePage = () => {
  return (
    <>
      <div className="w-full bg-card">
        <div className="containerBox relative h-80">
          <img
            className="w-full rounded-b-2xl h-full object-cover"
            src={profileCover}
            alt="profileCover"
          />
          <Avatar className="size-48 absolute left-1/2 -translate-x-1/2 -bottom-22 shadow-lg border-4 border-white">
            <AvatarImage
              className="object-cover  transition-transform duration-300 hover:scale-110 cursor-pointer"
              src={avatarImage}
              alt="userprofile"
            />
          </Avatar>
          <div className="flex justify-between text-lg mt-5">
            <EditModal />
            <div>
              <Button variant={"outline"}>
                <CiUser />
                <span className="ml-1 hidden sm:flex">Followers</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="containerBox pb-5 flex flex-col items-center mt-26">
          <div className="flex flex-col gap-y-2.5">
            <h1 className="font-semibold text-2xl">
              Ashim Maskey{" "}
              <span className="text-md italic font-extralight">(Reader)</span>
            </h1>
            <h3 className="text-md font-extralight">
              <span className="font-extrabold">Username:</span> ashim123
            </h3>
            <h3 className="text-md font-extralight">
              <span className="font-extrabold">Email:</span>{" "}
              ashimmaskey@gmail.com
            </h3>
            <h3 className="text-md font-extralight">
              <span className="font-extrabold">Bio: </span>
              This person has not added a bio yet.
            </h3>
            <Button variant={"destructive"}>Log Out</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
