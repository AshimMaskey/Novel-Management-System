import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const LoginPage = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full border-2 max-w-sm">
          <CardHeader className="text-center text-3xl">
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="mb-5">
                <Label className="mb-3 text-lg" htmlFor="username">
                  Username:
                </Label>
                <Input
                  className="border-2 p-5 border-border"
                  type="text"
                  id="username"
                  placeholder="Enter your username..."
                />
              </div>
              <div>
                <Label className="mb-3 text-lg" htmlFor="password">
                  Password:
                </Label>
                <Input
                  className="border-2 p-5 border-border"
                  type="password"
                  id="password"
                  placeholder="Enter your password..."
                />
              </div>
              <Button type="submit" className="w-full mt-5">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
