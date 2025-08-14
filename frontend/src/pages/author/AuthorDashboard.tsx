import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card1";
import Spinner from "@/components/ui/Spinner";
import { useAuthorDashboardQuery } from "@/features/admin/adminApi";
import { BarChart, BookOpen, MessageSquare, Star } from "lucide-react";
import { Link } from "react-router-dom";

const AuthorDashboard = () => {
  const { data, isLoading, error } = useAuthorDashboardQuery();
  if (isLoading) return <Spinner />;
  if (error) {
    console.log(error);
  }
  const dashboardData = [
    // {
    //   title: "Followers",
    //   value: data?.followersCount ?? 0,
    //   description: "Users following you",
    //   icon: Users,
    //   link: "",
    // },
    {
      title: "Novels",
      value: data?.novelsCount ?? 0,
      description: "Your novels",
      icon: BookOpen,
      link: "/author/novels",
    },
    {
      title: "Reviews",
      value: data?.reviewsCount ?? 0,
      description: "Total reviews count",
      icon: Star,
      link: "/author/reviews",
    },
    {
      title: "Views",
      value: data?.viewsCount ?? 0,
      description: "Total novel views",
      icon: BarChart,
      link: "",
    },
    {
      title: "Comments",
      value: data?.commentsCount ?? 0,
      description: "Total comments count",
      icon: MessageSquare,
      link: "",
    },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>

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

export default AuthorDashboard;
