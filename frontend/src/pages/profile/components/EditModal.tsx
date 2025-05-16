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

const EditModal = () => {
  const [formData, setFormData] = useState({
    username: "john123",
    fullName: "John Doe",
    email: "john@example.com",
    profileImg: null as File | null,
    preview: "/default-avatar.png", // initial avatar or fallback
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
              {/* Profile Image Preview */}
              <div className="flex flex-col items-start gap-2">
                <Label>Profile Image</Label>
                <img
                  src={formData.preview}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              {/* Email - Read Only */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="bg-muted cursor-not-allowed"
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
