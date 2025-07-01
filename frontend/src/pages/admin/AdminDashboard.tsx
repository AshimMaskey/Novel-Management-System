import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/Spinner";
import { useAdminDashboardQuery } from "@/features/admin/adminApi";
import {
  Users,
  BookOpen,
  UserCheck,
  ShieldCheck,
  MessageSquare,
  BookMarked,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data, isLoading, error } = useAdminDashboardQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    toast.error("An error occurred");
    console.log(error);
  }

  const dashboardData = [
    {
      title: "Users",
      value: data?.usersCount ?? 0,
      description: "Total registered users",
      icon: Users,
      link: "/admin/users",
    },
    {
      title: "Novels",
      value: data?.novelsCount ?? 0,
      description: "Published novels",
      icon: BookOpen,
      link: "/admin/novels",
    },
    {
      title: "Authors",
      value: data?.authorsCount ?? 0,
      description: "Active content creators",
      icon: UserCheck,
      link: "/admin/authors",
    },
    {
      title: "Admins",
      value: data?.adminCount ?? 0,
      description: "Platform administrators",
      icon: ShieldCheck,
      link: "/admin/admins",
    },
    {
      title: "Comments",
      value: data?.commentsCount ?? 0,
      description: "User comments on novels",
      icon: MessageSquare,
      link: "/admin/comments",
    },
    {
      title: "Genres",
      value: data?.genresCount ?? 0,
      description: "Available genres",
      icon: BookMarked,
      link: "/admin/genres",
    },
  ];

  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dashboardData.map((item) => (
          <Link to={item.link} key={item.title}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <item.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
