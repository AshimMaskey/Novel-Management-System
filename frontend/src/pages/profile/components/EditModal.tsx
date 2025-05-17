import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import avatar from "@/assets/avatar.png";

const EditModal = () => {
  const [formData, setFormData] = useState({
    username: "john123",
    fullName: "John Doe",
    email: "john@example.com",
    profileImg: null as File | null,
    preview: avatar,
  });

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
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default EditModal;
