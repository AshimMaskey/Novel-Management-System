import profileCover from "@/assets/profileCover.jfif";
import avatarImage from "@/assets/avatar.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
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
              className="object-cover"
              src={avatarImage}
              alt="userprofile"
            />
          </Avatar>
          <div className="flex text-lg mt-5">
            <div>
              <Button variant={"outline"}>
                <IoSettingsOutline />
                <span className="ml-1">Edit Profile</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="containerBox flex flex-col items-center mt-28">
          <div>
            <h1 className="font-semibold text-2xl">
              Ashim Maskey{" "}
              <span className="text-lg font-extralight">(Reader)</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
