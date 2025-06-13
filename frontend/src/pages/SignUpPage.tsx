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

import type { SignUpData } from "@/types/auth";
import { useSignupMutation } from "@/features/auth/authApi";
import type { ApiError } from "@/types/error";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth/authSlice";
import toast from "react-hot-toast";
import LoadingButton from "@/components/ui/LoadingButton";

const SignUpPage = () => {
  const [signUpFunc, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpData>({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.password ||
      !formData.fullName ||
      !formData.email
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      setError("Full name must contain only letters and spaces.");
      return;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/.test(formData.username)) {
      setError(
        "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
      );
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const data = await signUpFunc(formData).unwrap();
      if (data) {
        dispatch(setUser(data));
        toast.success("User registered successfully!");
      }
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError?.data?.message);
      console.log(apiError);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full sm:m-0 m-4 border-2 max-w-sm">
          <CardHeader className="text-center text-3xl">
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <Label className="mb-3 text-lg" htmlFor="fullName">
                  Full Name:
                </Label>
                <Input
                  className="border-2 p-5 border-border"
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name..."
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
              <div className="mb-2">
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
              <div className="mb-2">
                <Label className="mb-3 text-lg" htmlFor="email">
                  Email:
                </Label>
                <Input
                  className="border-2 p-5 border-border"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-2 relative">
                <Label className="mb-3 text-lg" htmlFor="password">
                  Password:
                </Label>
                <Input
                  className="border-2 p-5 border-border"
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
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              <span className="text-destructive">{error}</span>
              {isLoading ? (
                <LoadingButton value="Logging in..." />
              ) : (
                <Button type="submit" className="w-full mt-3">
                  Sign Up
                </Button>
              )}
            </form>
          </CardContent>
          <CardFooter>
            <p>
              Already have an account?
              <span className="underline text-primary">
                {" "}
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignUpPage;
