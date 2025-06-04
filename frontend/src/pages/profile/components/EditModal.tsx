import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { CiEdit } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GetUser, User } from "@/types/auth";
import { useUpdateUserMutation } from "@/features/user/userApi";
import type { ApiError } from "@/types/error";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface EditProps {
  user: User | GetUser | null;
}

const EditModal = ({ user }: EditProps) => {
  const [formData, setFormData] = useState({
    username: user?.username,
    fullName: user?.fullName,
    email: user?.email,
    profileImg: null as File | null,
    preview: user?.profileImg,
    bio: user?.bio,
  });

  const [updateFn, { isLoading }] = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImg: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = new FormData();

      if (formData.profileImg) {
        data.append("profileImg", formData.profileImg);
      }

      data.append("username", formData.username || "");
      data.append("fullName", formData.fullName || "");
      data.append("email", formData.email || "");
      data.append("bio", formData.bio || "");

      // Call mutation with FormData
      const responseData = await updateFn(data).unwrap();
      if (responseData) {
        toast.success("Profile updated successfully");
        setShowModal(false); // optionally close modal on success
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.log(apiError);
      toast.error(apiError?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div>
        <Button onClick={() => setShowModal(true)} variant={"outline"}>
          <CiEdit />
          <span className="ml-1 hidden sm:flex">Edit</span>
        </Button>
      </div>
      {showModal && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Edit Profile
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="space-y-4">
                <div className="flex flex-col items-start gap-2">
                  <Label className="mb-1 text-sm">Profile Image:</Label>
                  <img
                    src={formData.preview}
                    alt="img"
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                  <Input
                    className="border-2 border-border"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                  <Label className="mb-1 text-sm" htmlFor="username">
                    Username:
                  </Label>
                  <Input
                    className="border-2 border-border"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label className="mb-1 text-sm" htmlFor="fullName">
                    Full Name:
                  </Label>
                  <Input
                    className="border-2 border-border"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label className="mb-1 text-sm" htmlFor="email">
                    Email:
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="bg-muted border-2 border-border cursor-not-allowed"
                  />
                </div>
                <div>
                  <Label className="mb-1 text-sm" htmlFor="bio">
                    Bio:
                  </Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    className=" border-2 border-border"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                {isLoading ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Updating...
                  </Button>
                ) : (
                  <Button type="submit">Save Changes</Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default EditModal;
