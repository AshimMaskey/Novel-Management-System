import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full border-2 max-w-sm">
        <CardHeader className="text-center text-3xl">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <Label className="mb-3 text-lg" htmlFor="username">
                Username:
              </Label>
              <Input
                className="border-2 p-5 border-border"
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username..."
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="mb-2 relative">
              <Label className="mb-3 text-lg" htmlFor="password">
                Password:
              </Label>
              <Input
                className="border-2 p-5 border-border pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password..."
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-[52px] text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            <span className="text-destructive">{error}</span>
            <Button type="submit" className="w-full mt-3">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p>
            Don't have an account?
            <span className="underline text-primary">
              {" "}
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
